import {
  ObjectType,
  Field,
  Int,
  ID,
  InputType,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { Bouquet } from '../../bouquet/entities/bouquet.entity';

@InputType()
@ObjectType('SellerQuery')
export class Seller {
  @Field(() => ID, { description: 'ID of Seller' })
  id: string;
  @Field(() => String, { description: 'Name of Seller' })
  name: string;
  @Field(() => String, { description: 'URL of Seller photo' })
  photo: string;
  @Field(() => GraphQLISODateTime, { description: 'Creation time of Seller' })
  creationTime: Date;
  @Field(() => Int, { description: 'Count of sold Bouquets of Seller' })
  sold: number;

  @Field(() => [Bouquet], {
    description: 'Count of sold Bouquets of Seller',
    nullable: 'itemsAndList',
  })
  bouquets: Bouquet[];

  constructor(
    id: string,
    name: string,
    photo: string,
    creationTime: Date,
    sold: number,
  ) {
    this.id = id;
    this.name = name;
    this.photo = photo;
    this.creationTime = creationTime;
    this.sold = sold;
  }
}
