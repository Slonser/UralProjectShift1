import { Injectable } from '@nestjs/common';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { getMongoManager } from 'typeorm';
import { CustomerDB } from './entities/customer_db.entity';
import { ObjectID } from 'mongodb';

@Injectable()
export class CustomerService {
  private manager;

  async create(createCustomerInput: CreateCustomerInput) {
    if(!this.manager) this.manager =  getMongoManager();
    const result = new CustomerDB(
      createCustomerInput.name,
      createCustomerInput.email,
    );
    await this.manager.save(result);
    return result;
  }

  async findAll() {
    if(!this.manager) this.manager =  getMongoManager();
    return await this.manager.find(CustomerDB);
  }

  async findOne(id: string) {
    if(!this.manager) this.manager =  getMongoManager();
    const result = await this.manager.findOne(CustomerDB, {
      where: { _id: ObjectID(id) },
    });
    if (!result) throw Error('Not Found');
    return result;
  }

  async update(id: string, updateCustomerInput: UpdateCustomerInput) {
    if(!this.manager) this.manager =  getMongoManager();
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
    if(!this.manager) this.manager =  getMongoManager();
    return await this.manager.deleteOne(CustomerDB, { _id: ObjectID(id) });
  }
}
