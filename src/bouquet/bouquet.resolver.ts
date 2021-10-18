import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BouquetService } from './bouquet.service';
import { Bouquet } from './entities/bouquet.entity';
import { CreateBouquetInput } from './dto/create-bouquet.input';
import { UpdateBouquetInput } from './dto/update-bouquet.input';
import { SellerService } from '../seller/seller.service';
import { Seller } from '../seller/entities/seller.entity';

@Resolver(() => Bouquet)
export class BouquetResolver {
  constructor(
    private readonly bouquetService: BouquetService,
    private readonly sellerService: SellerService,
  ) {}

  @Mutation(() => Bouquet)
  createBouquet(
    @Args('createBouquetInput') createBouquetInput: CreateBouquetInput,
  ) {
    return this.bouquetService.create(createBouquetInput);
  }

  @Query(() => [Bouquet], { name: 'bouquets' })
  findAll() {
    return this.bouquetService.findAll();
  }

  @Query(() => Bouquet, { name: 'bouquet' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.bouquetService.findOne(id);
  }

  @Mutation(() => Bouquet)
  updateBouquet(
    @Args('updateBouquetInput') updateBouquetInput: UpdateBouquetInput,
  ) {
    return this.bouquetService.update(
      updateBouquetInput.id,
      updateBouquetInput,
    );
  }

  @Mutation(() => Bouquet)
  async removeBouquet(@Args('id', { type: () => ID }) id: string) {
    const res = await this.bouquetService.findOne(id);
    await this.bouquetService.remove(id);
    return res;
  }
  @ResolveField(() => Seller)
  async seller(@Parent() bouquet: Bouquet) {
    const { seller } = await this.bouquetService.findOne(bouquet.id);
    const result = await this.sellerService.findOne(seller);
    return new Seller(
      result.id.toString(),
      result.name,
      result.photo,
      result.creationTime,
      result.sold,
    );
  }
}
