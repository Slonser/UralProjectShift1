import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PurchaseDB {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  bouquet: string;

  @Column()
  customer: string;

  @Column()
  cost: number;

  @Column()
  profit: number;
  constructor(bouquet: string, customer: string, cost: number) {
    this.bouquet = bouquet;
    this.customer = customer;
    this.cost = cost;
    this.profit = cost * 0.3;
    this.profit = Math.floor(this.profit * 100) / 100;
  }
}
