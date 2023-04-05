import { Resolver, Query } from '@nestjs/graphql';
import { GraphqlService } from './graphql.service';
import { GraphQLReclamos } from './entities/graphqlReclamo.entity';


@Resolver(() => GraphQLReclamos)
export class GraphqlResolver {
  constructor(private readonly graphqlService: GraphqlService) {}


  @Query(() => [GraphQLReclamos], { name: 'graphqlsearchByMatch' })
  async findAll(): Promise<GraphQLReclamos[]> {
    return this.graphqlService.findBySearch();
  }

}
