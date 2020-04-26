import {
  BaseEntity,
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { Exclude } from 'class-transformer';
@Entity()
export class Photo extends BaseEntity {
  @Column()
  url: string;

  @Exclude()
  @ManyToOne(
    type => Post,
    post => post.photos,
    { onDelete: 'CASCADE' },
  )
  post: Post;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;
}
