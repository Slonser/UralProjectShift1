import {Args, ID, Mutation, Parent, Query, ResolveField, Resolver,} from '@nestjs/graphql';
import {SellerService} from './seller.service';
import {Seller} from './entities/seller.entity';
import {CreateSellerInput} from './dto/create-seller.input';
import {UpdateSellerInput} from './dto/update-seller.input';
import {Bouquet} from '../bouquet/entities/bouquet.entity';
import {BouquetService} from '../bouquet/bouquet.service';

@Resolver(() => Seller)
export class SellerResolver {
  constructor(
    private readonly sellerService: SellerService,
    private readonly bouquetService: BouquetService,
  ) {}

  @Mutation(() => Seller)
  createSeller(
    @Args('createSellerInput') createSellerInput: CreateSellerInput,
  ) {
    return this.sellerService.create(createSellerInput);
  }

  @Query(() => [Seller], { name: 'sellers' })
  findAll() {
    return this.sellerService.findAll();
  }

  @Query(() => Seller, { name: 'seller' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.sellerService.findOne(id);
  }

  @Mutation(() => Seller)
  updateSeller(
    @Args('updateSellerInput') updateSellerInput: UpdateSellerInput,
  ) {
    return this.sellerService.update(updateSellerInput.id, updateSellerInput);
  }

  @Mutation(() => Seller)
  async removeSeller(@Args('id', { type: () => ID }) id: string) {
    const res = await this.sellerService.findOne(id);
    await this.sellerService.remove(id);
    return res;
  }
  @ResolveField(() => [Bouquet])
  async bouquets(@Parent() seller: Seller) {
    return await this.bouquetService.findAllBySeller(seller.id);
  }
}
