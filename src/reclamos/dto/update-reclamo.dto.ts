import { PartialType } from '@nestjs/swagger';
import { CreateReclamoInput } from './index';
import { IsUUID } from 'class-validator';

export class UpdateReclamoInput extends PartialType(CreateReclamoInput) {
  
  @IsUUID()
  id: string;
}