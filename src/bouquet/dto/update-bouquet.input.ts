import { CreateBouquetInput } from './create-bouquet.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBouquetInput extends PartialType(CreateBouquetInput) {
  @Field(() => String)
  id: string;
}
