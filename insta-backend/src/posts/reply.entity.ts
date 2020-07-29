import {
  Column,
  ManyToOne,
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  JoinTable,
  OneToMany,
  ManyToMany,
  CreateDateColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Comment } from './comment.entity';
import { User } from '../auth/user.entity';
import { Transform } from 'class-transformer';

@Entity()
export class Reply extends BaseEntity {
  @CreateDateColumn()
  timeCreated: Date;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  contents: string;

  @ManyToOne(
    type => Comment,
    comment => comment.replies,
    { onDelete: 'CASCADE' },
  )
  @JoinTable()
  @Transform((comment: Comment) => ({
    id: comment.id,
    contents: comment.contents,
  }))
  inReplyTo: Comment;

  @ManyToOne(
    type => User,
    user => user.replies,
  )
  @Transform((user: User) => ({
    id: user.id,
    username: user.username,
    profilePhoto: user.profilePhoto,
  }))
  user: User;

  @ManyToMany(
    type => User,
    user => user.likedReplies,
    { onDelete: 'CASCADE' },
  )
  @Transform((user: User) => ({
    id: user.id,
    username: user.username,
  }))
  likes: User[];
}
