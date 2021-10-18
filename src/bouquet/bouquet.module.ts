import { Module } from '@nestjs/common';
import { BouquetService } from './bouquet.service';
import { BouquetResolver } from './bouquet.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BouquetDB } from './entities/bouquet_db.entity';
import { SellerService } from '../seller/seller.service';

@Module({
  imports: [TypeOrmModule.forFeature([BouquetDB])],
  providers: [BouquetResolver, BouquetService, SellerService],
})
export class BouquetModule {}
