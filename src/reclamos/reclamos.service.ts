import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReclamoInput, UpdateReclamoInput } from './dto/';
import { Reclamo } from './entities/reclamo.entity';
import { v4 as uuid } from 'uuid';
import { User } from 'src/auth/entities/user.entity';
import { PaginationArgs } from 'src/common/dto/pagination.dto';
import { SearchArgs } from 'src/common/dto/search.dto';
import { ProductImage } from './entities';
import { FileCsv } from './entities/index';
import { AwsService } from '../aws/aws.service';

@Injectable()
export class ReclamosService {

  constructor(
    @InjectRepository(Reclamo)
    private readonly reclamosRepository: Repository<Reclamo>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    @InjectRepository(FileCsv)
    private readonly fileCsvRepository: Repository<FileCsv>,

    private readonly awsService: AwsService

  ){}


  async create(files: Express.Multer.File[], createReclamoInput: CreateReclamoInput, user: User): Promise<Reclamo> {

    let imageFile: Express.Multer.File;
    let csvFile: Express.Multer.File;
    let imageQuantity = 0;
    let fileQuantity = 0;

    const validExtensionsImage = ['jpg', 'jpeg', 'gif', 'png',]
    const validExtensionsCsv = ['csv']

    files.forEach(file => {
      
      const fileExtension = file.mimetype.split('/')[1];

      if ( validExtensionsImage.includes(fileExtension) ) {

        imageFile = file
        imageQuantity = imageQuantity + 1
      }

      if ( validExtensionsCsv.includes(fileExtension) ) {

        csvFile = file
        fileQuantity = fileQuantity + 1
      }

    });

    if ( imageQuantity > 1 ) throw new BadRequestException(`Debes subir una sola imagen`)

    if ( fileQuantity > 1 ) throw new BadRequestException(`Debes subir un solo archivo csv`)


    if ( !imageFile || ! csvFile )
    throw new BadRequestException(`Solo se admiten archivos ${validExtensionsCsv} y ${validExtensionsImage}`)

    const imageToS3 = await this.awsService.uploadFileToS3(imageFile)

    const imageToCreate =  this.productImageRepository.create({
      url: imageToS3.Location
    })
    const imageToUploadDB = await this.productImageRepository.save(imageToCreate)
    
    const fileToCreate = this.fileCsvRepository.create({
      name: csvFile.buffer.toString()
    })
    const fileToUploadDB = await this.fileCsvRepository.save(fileToCreate)

        
    const nuevoReclamo = this.reclamosRepository.create({
      numeroReclamo: uuid(),
      ...createReclamoInput,
      imagen: imageToUploadDB,
      user,
      detalle_compra: fileToUploadDB
    })

    
    return await this.reclamosRepository.save( nuevoReclamo );
  }

  async findAll() {
    return this.reclamosRepository.find()
  }


  async findOne(numeroReclamo: string, user: User): Promise<Reclamo> {
    const reclamo = await this.reclamosRepository.findOneBy( {
      numeroReclamo,
      user: {
        id: user.id
      }
    } )

    if ( !reclamo ) throw new NotFoundException(`El reclamo con numeroReclamo ${numeroReclamo} no se puede encontrar`)

    return reclamo;
  }


  async searchByMatch( paginationArgs: PaginationArgs, searchArgs: SearchArgs, user: User): Promise<Reclamo[]> {

    const { search } = searchArgs;
    const { limit, offset } = paginationArgs;

    const queryBuilder = this.reclamosRepository.createQueryBuilder()
      .take(limit)
      .skip(offset)


    if ( search ) {

      queryBuilder.andWhere('LOWER(titulo) like :titulo', { titulo: `%${search.toLowerCase()}%`})
        .orWhere('LOWER(problema) like :problema', { problema: `%${search.toLowerCase()}%`})

    }

    return queryBuilder.getMany();

  }



  async update(numeroReclamo: string, updateReclamoInput: UpdateReclamoInput, user: User): Promise<Reclamo> {

    await this.findOne(numeroReclamo, user);
    const nuevoReclamo = await this.reclamosRepository.preload( {...updateReclamoInput, user} )

    if ( !nuevoReclamo ) throw new NotFoundException(`El reclamo con numeroReclamo ${numeroReclamo} no se puede encontrar`);

    return this.reclamosRepository.save( nuevoReclamo );
  }



  async remove(numeroReclamo: string, user: User): Promise<Reclamo> {
    
    const reclamo = await this.findOne(numeroReclamo, user);

    const imagenReclamo = reclamo.imagen
    const detalleReclamos = reclamo.detalle_compra

    await this.reclamosRepository.remove( reclamo );
    await this.productImageRepository.remove( imagenReclamo )
    await this.fileCsvRepository.remove( detalleReclamos )

    return { ...reclamo, numeroReclamo };
  }


}
