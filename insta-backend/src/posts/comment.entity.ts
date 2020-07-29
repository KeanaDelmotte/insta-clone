import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { Post } from './post.entity';
import { Transform } from 'class-transformer';
import { Reply } from './reply.entity';
import { ProfilePhoto } from '../auth/profilePhoto.entity';
import { userInfo } from 'os';

@Entity()
export class Comment extends BaseEntity {
  @CreateDateColumn()
  timeCreated: Date;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contents: string;

  @ManyToOne(
    type => User,
    user => user.comments,
    { eager: true },
  )
  @Transform((user: User) => {
    return {
      id: user.id,
      username: user.username,
      profilePhoto: user.profilePhoto,
    };
  })
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
      profilePhoto: user.profilePhoto,
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
  )
  @Transform((replies: Reply[]) => {
    const transformedReplies = replies.map(reply => ({
      id: reply.id,
      user: reply.user,
      contents: reply.contents,
    }));
    return transformedReplies;
  })
  replies: Reply[];
}
