import { User } from './user.entity';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class ProfilePhoto extends BaseEntity {
  @Column()
  url: string;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;
}
