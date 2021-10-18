import { Injectable } from '@nestjs/common';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { getMongoManager } from 'typeorm';
import { CustomerDB } from './entities/customer_db.entity';
import { ObjectID } from 'mongodb';
import { BouquetDB } from '../bouquet/entities/bouquet_db.entity';

@Injectable()
export class CustomerService {
  private manager = getMongoManager();

  async create(createCustomerInput: CreateCustomerInput) {
    const result = new CustomerDB(
      createCustomerInput.name,
      createCustomerInput.email,
    );
    await this.manager.save(result);
    return result;
  }

  async findAll() {
    return await this.manager.find(CustomerDB);
  }

  async findOne(id: string) {
    const result = await this.manager.findOne(CustomerDB, {
      where: { _id: ObjectID(id) },
    });
    if (!result) throw Error('Not Found');
    return result;
  }

  async update(id: string, updateCustomerInput: UpdateCustomerInput) {
    const result = await this.findOne(id);
    if (!result) throw Error('Not found');
    await this.manager.updateOne(
      CustomerDB,
      { _id: ObjectID(id) },
      { $set: updateCustomerInput },
    );
    return await this.findOne(id);
  }
  async remove(id: string) {
    return await this.manager.deleteOne(CustomerDB, { _id: ObjectID(id) });
  }
}
