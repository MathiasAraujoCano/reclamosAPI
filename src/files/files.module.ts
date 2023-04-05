import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';


@Module({
  controllers: [],
  providers: [],
  imports: [ConfigModule],
  exports: []
})
export class FilesModule {}
