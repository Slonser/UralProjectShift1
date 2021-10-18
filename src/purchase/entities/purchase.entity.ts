import { ObjectType, Field, Int, ID, InputType } from '@nestjs/graphql';

@InputType()
@ObjectType('PurchaseQuery')
export class Purchase {
  @Field(() => ID, { description: 'ID' })
  id: string;

  @Field(() => Number, { description: 'Cost' })
  cost: number;

  @Field(() => Number, { description: 'profit' })
  profit: number;
}
