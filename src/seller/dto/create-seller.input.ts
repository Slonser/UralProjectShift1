import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { Bouquet } from '../../bouquet/entities/bouquet.entity';

@InputType()
export class CreateSellerInput {
  @Field(() => String, { description: 'Name of Seller' })
  name: string;
  @Field(() => String, { description: 'URL of Seller photo' })
  photo: string;
}
