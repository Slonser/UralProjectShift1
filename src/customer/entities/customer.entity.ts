import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { Purchase } from '../../purchase/entities/purchase.entity';

@InputType()
@ObjectType('CustomerQuery')
export class Customer {
  @Field(() => ID, { description: 'ID' })
  id: string;

  @Field(() => String, { description: 'Name of Customer' })
  name: string;

  @Field(() => String, { description: 'Email of Customer' })
  email: string;
}
