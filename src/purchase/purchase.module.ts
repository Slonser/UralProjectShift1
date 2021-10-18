import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseResolver } from './purchase.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseDB } from './entities/purchase_db.entity';
import { BouquetService } from '../bouquet/bouquet.service';
import { CustomerService } from '../customer/customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseDB])],
  providers: [
    PurchaseResolver,
    PurchaseService,
    BouquetService,
    CustomerService,
  ],
})
export class PurchaseModule {}
