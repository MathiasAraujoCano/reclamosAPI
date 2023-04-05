import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { FileCsv } from '../entities/file-csv.entity';

export class CreateReclamoInput {

  @IsNotEmpty()
  @IsIn(['falla', 'consulta', 'reclamo'])
  titulo: string;
 
  @IsString()
  @IsNotEmpty()
  problema: string;

  @IsString()
  @IsNotEmpty()
  detalle_compra: FileCsv;

}