import { Injectable } from '@nestjs/common';
import { PurchaseBouquetInput } from './dto/create-purchase.input';
import { getMongoManager } from 'typeorm';
import { PurchaseDB } from './entities/purchase_db.entity';
import { BouquetDB } from '../bouquet/entities/bouquet_db.entity';
import { ObjectID } from 'mongodb';

@Injectable()
export class PurchaseService {
  private manager = getMongoManager();

  async create(purchaseBouquetInput: PurchaseBouquetInput) {
    const { bouquet, customer } = purchaseBouquetInput;
    const cost = await this.manager.findOne(BouquetDB, {
      where: { _id: ObjectID(bouquet) },
    });
    const result = new PurchaseDB(bouquet, customer, cost.price);
    return await this.manager.save(result);
  }

  async findOne(id: string) {
    return await this.manager.find(PurchaseDB, { where: { customer: id } });
  }
  async findById(id: string) {
    return this.manager.findOne(PurchaseDB, { where: { _id: ObjectID(id) } });
  }
}
