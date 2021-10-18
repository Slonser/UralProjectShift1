import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerDB } from './entities/customer_db.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerDB])],
  providers: [CustomerResolver, CustomerService],
})
export class CustomerModule {}
