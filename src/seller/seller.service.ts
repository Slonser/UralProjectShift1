import {Injectable} from '@nestjs/common';
import {CreateSellerInput} from './dto/create-seller.input';
import {UpdateSellerInput} from './dto/update-seller.input';
import {getMongoManager} from 'typeorm';
import {SellerDB} from './entities/seller_db.entity';
import {ObjectID} from 'mongodb';
import {BouquetDB} from '../bouquet/entities/bouquet_db.entity';

@Injectable()
export class SellerService {
  private manager = getMongoManager();

  async create(createSellerInput: CreateSellerInput) {
    const { name, photo } = createSellerInput;
    const result = new SellerDB(name, photo);
    await this.manager.save(result);
    return result;
  }

  async findAll() {
    return await this.manager.find(SellerDB);
  }

  async findOne(id: string) {
    const result = await this.manager.findOne(SellerDB, {
      where: { _id: ObjectID(id) },
    });
    if (result) return result;
    throw Error('Not found');
  }

  async update(id: string, updateSellerInput: UpdateSellerInput) {
    const result = await this.manager.findOne(SellerDB, {
      where: { _id: ObjectID(id) },
    });
    if (!result) throw Error('Invalid id');
    await this.manager.updateOne(
      SellerDB,
      { _id: ObjectID(id) },
      { $set: updateSellerInput },
    );
    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.manager.deleteMany(BouquetDB, { seller: id });
    return await this.manager.deleteOne(SellerDB, { _id: ObjectID(id) });
  }
}
