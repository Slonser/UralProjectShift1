import {
  Column,
  Entity,
  getMongoManager,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bouquet } from '../../bouquet/entities/bouquet.entity';

@Entity()
export class SellerDB {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  photo: string;

  @Column()
  creationTime: Date;

  @Column()
  bouquets: ObjectID[];

  @Column({ default: 0 })
  sold: number = 0;

  constructor(name: string, photo: string) {
    this.name = name;
    this.photo = photo;
    this.creationTime = new Date();
    this.bouquets = [];
  }
}
