import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class PurchaseBouquetInput {
  @Field(() => ID, { description: 'BouquetID' })
  bouquet: string;

  @Field(() => ID, { description: 'CustomerID' })
  customer: string;
}
