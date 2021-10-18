import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { Purchase } from '../../purchase/entities/purchase.entity';

@InputType()
export class CreateCustomerInput {
  @Field(() => String, { description: 'Name of Customer' })
  name: string;

  @Field(() => String, { description: 'Email of Customer' })
  email: string;
}
