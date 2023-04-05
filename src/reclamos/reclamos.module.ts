import { Module } from '@nestjs/common';
import { ReclamosService } from './reclamos.service';
import { ReclamosController } from './reclamos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage, Reclamo } from './entities';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';
import { FileCsv } from './entities/file-csv.entity';
import { AwsModule } from '../aws/aws.module';

@Module({
  controllers: [ReclamosController],
  providers: [ReclamosService],
  imports: [
    TypeOrmModule.forFeature([Reclamo, ProductImage, FileCsv]),
    AuthModule, FilesModule, AwsModule
  ],
  exports: [ReclamosService, TypeOrmModule]
})
export class ReclamosModule {}
