import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { Post } from './post.entity';
import { Transform } from 'class-transformer';
import { Reply } from './reply.entity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contents: string;

  @ManyToOne(
    type => User,
    user => user.comments,
    { eager: true },
  )
  @Transform((user: User) => ({
    id: user.id,
    username: user.username,
  }))
  user: User;

  @ManyToMany(
    type => User,
    user => user.likedComments,
    { eager: true },
  )
  @Transform((users: User[]) => {
    const transformedUsers = users.map(user => ({
      id: user.id,
      username: user.username,
    }));

    return transformedUsers;
  })
  likes: User[];

  @ManyToOne(
    type => Post,
    post => post.comments,
    {
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  post: Post;

  @OneToMany(
    type => Reply,
    reply => reply.inReplyTo,
    { eager: true },
  )
  replies: Reply[];
}
