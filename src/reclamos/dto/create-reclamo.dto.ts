import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { FileCsv } from '../entities/file-csv.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReclamoInput {

  @ApiProperty({
    description: 'titulo del reclamo',
    nullable: false,
    minLength: 1
})
  @IsNotEmpty()
  @IsIn(['falla', 'consulta', 'reclamo'])
  titulo: string;
 
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  problema: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  detalle_compra: FileCsv;

}