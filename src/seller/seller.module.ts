import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerResolver } from './seller.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerDB } from './entities/seller_db.entity';
import { BouquetService } from '../bouquet/bouquet.service';

@Module({
  imports: [TypeOrmModule.forFeature([SellerDB])],
  providers: [SellerResolver, SellerService, BouquetService],
})
export class SellerModule {}
