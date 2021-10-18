import { Field, Int, InputType, ID } from '@nestjs/graphql';
import { Seller } from '../../seller/entities/seller.entity';

@InputType()
export class CreateBouquetInput {
  @Field(() => String, { description: 'Name of Bouquet' })
  name: string;

  @Field(() => Int, { description: 'Price of Bouquet' })
  price: number;

  @Field(() => String, { description: 'URL of Bouquet photo' })
  photo: string;

  @Field(() => String, { description: 'SellerID of Bouquet' })
  sellerID: string;
}
