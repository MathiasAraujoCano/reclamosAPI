import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, UploadedFile, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ReclamosService } from './reclamos.service';
import { CreateReclamoInput, UpdateReclamoInput } from './dto/index';
import { User } from 'src/auth/entities/user.entity';
import { Reclamo } from './entities';
import { PaginationArgs } from 'src/common/dto/pagination.dto';
import { SearchArgs } from 'src/common/dto/search.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { FilesInterceptor } from '@nestjs/platform-express';
import { fileFilter } from 'src/files/helpers/fileFilter.helper';
import { AwsService } from '../aws/aws.service';


@Controller('reclamos')
@Auth()
export class ReclamosController {
  constructor(
    private readonly reclamosService: ReclamosService,
    ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 2, {
    fileFilter: fileFilter
  }))
  async create(
    @GetUser() user: User,
    @Body() createReclamoInput: CreateReclamoInput,
    @UploadedFiles() files) {

      return this.reclamosService.create(files, createReclamoInput, user)

  }

  @Get()
  async searchByMatch(
    @Query() paginationArgs: PaginationArgs,
    @Query() searchArgs: SearchArgs,
    @GetUser() user: User
  ): Promise<Reclamo[]> {
    return this.reclamosService.searchByMatch(paginationArgs, searchArgs, user);
  }

  @Get(':numeroReclamo')
  async findOne(
    @Param('numeroReclamo', ParseUUIDPipe) numeroReclamo: string,
    @GetUser() user: User
    ): Promise<Reclamo> {
    return this.reclamosService.findOne(numeroReclamo, user);
  }

  @Patch(':numeroReclamo')
  @Auth(ValidRoles.admin)
  update(
    @Param('numeroReclamo', ParseUUIDPipe) numeroReclamo: string,
    @GetUser() user: User,
    @Body() updateReclamoDto: UpdateReclamoInput
    ) {
    return this.reclamosService.update(numeroReclamo, updateReclamoDto, user);
  }

  @Delete(':numeroReclamo')
  @Auth(ValidRoles.admin)
  remove(
    @Param('numeroReclamo') numeroReclamo: string,
    @GetUser() user: User
    ) {
      return this.reclamosService.remove(numeroReclamo, user);
    }
}
