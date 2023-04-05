import { Module } from '@nestjs/common';
import { GraphqlService } from './graphql.service';
import { GraphqlResolver } from './graphql.resolver';
import { ReclamosModule } from 'src/reclamos/reclamos.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [GraphqlResolver, GraphqlService],
  imports: [ReclamosModule, AuthModule],
  exports: [GraphqlModule]
})
export class GraphqlModule {}
