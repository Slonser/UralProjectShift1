import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PurchaseService } from './purchase.service';
import { Purchase } from './entities/purchase.entity';
import { PurchaseBouquetInput } from './dto/create-purchase.input';
import { Bouquet } from '../bouquet/entities/bouquet.entity';
import { BouquetService } from '../bouquet/bouquet.service';
import { Customer } from '../customer/entities/customer.entity';
import { CustomerService } from '../customer/customer.service';

@Resolver(() => Purchase)
export class PurchaseResolver {
  constructor(
    private readonly purchaseService: PurchaseService,
    private readonly bouquetService: BouquetService,
    private readonly customerService: CustomerService,
  ) {}

  @Mutation(() => Purchase)
  async purchaseBouquet(
    @Args('purchaseBouquetInput') createPurchaseInput: PurchaseBouquetInput,
  ) {
    return await this.purchaseService.create(createPurchaseInput);
  }

  @Query(() => [Purchase], { name: 'purchases' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return await this.purchaseService.findOne(id);
  }

  @ResolveField(() => Bouquet)
  async bouquet(@Parent() purchase: Purchase) {
    const result = await this.purchaseService.findById(purchase.id);
    return this.bouquetService.findOne(result.bouquet);
  }

  @ResolveField(() => Customer)
  async customer(@Parent() purchase: Purchase) {
    const result = await this.purchaseService.findById(purchase.id);
    return this.customerService.findOne(result.customer);
  }
}
