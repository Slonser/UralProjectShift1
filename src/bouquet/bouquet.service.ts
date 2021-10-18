import {Injectable} from '@nestjs/common';
import {CreateBouquetInput} from './dto/create-bouquet.input';
import {UpdateBouquetInput} from './dto/update-bouquet.input';
import {BouquetDB} from './entities/bouquet_db.entity';
import {getMongoManager} from 'typeorm';
import {ObjectID} from 'mongodb';
import {SellerDB} from '../seller/entities/seller_db.entity';

@Injectable()
export class BouquetService {
  private manager = getMongoManager();

  async create(createBouquetInput: CreateBouquetInput) {
    const { name, price, photo, sellerID } = createBouquetInput;
    const bouquet = new BouquetDB(name, price, photo, sellerID);
    const seller = await this.manager.findOne(SellerDB, {
      where: { _id: ObjectID(sellerID) },
    });
    await this.manager.updateOne(
      SellerDB,
      { _id: ObjectID(sellerID) },
      { $push: { bouquets: bouquet.id } },
    );

    if (!seller) throw Error('Invalid seller');
    return await this.manager.save(bouquet);
  }

  async findAll() {
    return await this.manager.find(BouquetDB);
  }
  async findAllBySeller(id: string) {
    return await this.manager.find(BouquetDB, {
      where: {seller: id.toString()},
    });
  }
  async findOne(id: string) {
    const result = await this.manager.findOne(BouquetDB, {
      where: { _id: ObjectID(id) },
    });
    if (result) return result;
    throw Error('Not found');
  }

  async update(id: string, updateBouquetInput: UpdateBouquetInput) {
    const result = await this.findOne(id);
    if (!result) throw Error('Not found');
    await this.manager.updateOne(
      BouquetDB,
      { _id: ObjectID(id) },
      { $set: updateBouquetInput },
    );
    return await this.findOne(id);
  }

  async remove(id: string) {
    return await this.manager.deleteOne(BouquetDB, { _id: ObjectID(id) });
  }
}
