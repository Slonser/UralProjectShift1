import { ObjectType, Field, Int, ID, InputType } from '@nestjs/graphql';

@InputType()
@ObjectType('BouquetQuery')
export class Bouquet {
  @Field(() => ID, { description: 'ID' })
  id: string;

  @Field(() => String, { description: 'Name of Bouquet' })
  name: string;

  @Field(() => Int, { description: 'Price of Bouquet' })
  price: number;

  @Field(() => String, { description: 'URL of Bouquet photo' })
  photo: string;
}
