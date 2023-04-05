import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGraphqlInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
