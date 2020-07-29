import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Post } from '../posts/post.entity';
import { Comment } from '../posts/comment.entity';
import { Exclude, Transform } from 'class-transformer';
import { Reply } from '../posts/reply.entity';
import { Notification } from '../notifications/notification.entity';
import { Photo } from '../posts/photo.entity';
import { ProfilePhoto } from './profilePhoto.entity';
import { Optional } from '@nestjs/common';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @CreateDateColumn()
  dateJoined: Date;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ nullable: true })
  name?: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  @Exclude()
  salt: string;

  @OneToOne(type => ProfilePhoto, { eager: true })
  @JoinColumn()
  profilePhoto: ProfilePhoto;

  @OneToMany(
    type => Post,
    post => post.user,
  )
  posts: Post[];

  async validatePassword(password: string) {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  @ManyToMany(
    type => Post,
    post => post.likes,
  )
  likedPosts: Post[];

  @OneToMany(
    type => Comment,
    comment => comment.user,
  )
  comments: Comment[];

  @ManyToMany(
    type => Comment,
    comment => comment.likes,
  )
  @JoinTable()
  @Transform((comments: Comment[]) => {
    const transformedComments = comments.map(comment => ({
      id: comment.id,
      contents: comment.contents,
      user: comment.user,
    }));
    return transformedComments;
  })
  likedComments: Comment[];

  @ManyToMany(
    type => User,
    user => user.following,
  )
  @Transform((followers: User[]) => {
    const transformedFollowers = followers.map(follower => ({
      id: follower.id,
      username: follower.username,
      profilePhoto: follower.profilePhoto,
    }));
    return transformedFollowers;
  })
  followers: User[];

  @JoinTable()
  @ManyToMany(
    type => User,
    user => user.followers,
  )
  @Transform((followings: User[]) => {
    const transformedFollowings = followings.map(following => ({
      id: following.id,
      username: following.username,
      profilePhoto: following.profilePhoto,
    }));
    return transformedFollowings;
  })
  following: User[];

  @OneToMany(
    type => Reply,
    reply => reply.user,
    { eager: true },
  )
  @JoinTable()
  replies: Reply[];

  @ManyToMany(
    type => Reply,
    reply => reply.likes,
  )
  @JoinTable()
  likedReplies: Reply[];

  @ManyToMany(
    type => Post,
    post => post.saves,
  )
  @Exclude()
  @JoinTable()
  savedPosts: Post[];

  @ManyToMany(
    type => Post,
    post => post.tags,
    { eager: true },
  )
  taggedIn: Post[];

  @Exclude()
  @OneToMany(
    type => Notification,
    notification => notification.receiver,
  )
  notifications: Notification[];

  @Exclude()
  @OneToMany(
    type => Notification,
    notification => notification.initiator,
  )
  notificationsInitiated: Notification[];
}
