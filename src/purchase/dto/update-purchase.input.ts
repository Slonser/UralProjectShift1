import { PurchaseBouquetInput } from './create-purchase.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePurchaseInput extends PartialType(PurchaseBouquetInput) {
  @Field(() => String)
  id: string;
}
