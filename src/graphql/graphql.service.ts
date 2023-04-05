import { Injectable } from '@nestjs/common';
import { Reclamo } from 'src/reclamos/entities';
import { ReclamosService } from 'src/reclamos/reclamos.service';

@Injectable()
export class GraphqlService {


  constructor(
    private readonly reclamosService: ReclamosService

  ){}


  async findBySearch(): Promise<Reclamo[]> {
    
    return this.reclamosService.findAll()

  }


}
