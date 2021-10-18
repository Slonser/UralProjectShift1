import {
  BaseEntity,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Purchase } from '../../purchase/entities/purchase.entity';

@Entity()
export class CustomerDB extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  purchases: string[];
  constructor(name: string, email: string) {
    super();
    this.name = name;
    this.email = email;
  }
}
