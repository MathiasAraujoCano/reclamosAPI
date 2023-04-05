import { CreateReclamoInput } from './index';
import { IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateReclamoInput extends PartialType(CreateReclamoInput) {
  
  @IsUUID()
  id: string;
}