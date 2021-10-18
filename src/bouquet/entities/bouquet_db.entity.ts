import {
  BaseEntity,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BouquetDB extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  photo: string;

  @Column()
  seller: string;
  constructor(name: string, price: number, photo: string, seller: string) {
    super();
    this.name = name;
    this.photo = photo;
    this.price = price;
    this.seller = seller;
  }
}
