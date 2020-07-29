import {
  Entity,
  BaseEntity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { Photo } from './photo.entity';
import { Exclude, Transform } from 'class-transformer';
import { Comment } from './comment.entity';
import { IsNotEmpty } from 'class-validator';
import { Notification } from '../notifications/notification.entity';
import { ProfilePhoto } from '../auth/profilePhoto.entity';

@Entity()
export class Post extends BaseEntity {
  @CreateDateColumn()
  timeCreated: Date;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  description: string;

  @OneToMany(
    type => Photo,
    photo => photo.post,
    {
      eager: true,
    },
  )
  photos: Photo[];

  @ManyToOne(
    type => User,
    user => user.posts,
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
    user => user.likedPosts,
  )
  @JoinTable()
  likes: User[];

  @OneToMany(
    type => Comment,
    comment => comment.post,
  )
  comments: Comment[];

  @ManyToMany(
    type => User,
    user => user.savedPosts,
  )
  @Exclude()
  saves: User[];

  @ManyToMany(
    type => User,
    user => user.taggedIn,
    { nullable: true },
  )
  @JoinTable()
  @Transform((tags: User[]) => {
    const transformedTags = tags.map(tag => ({
      username: tag.username,
      id: tag.id,
    }));
    return transformedTags;
  })
  tags?: User[];

  @OneToMany(
    type => Notification,
    notification => notification.post,
  )
  notifications: Notification[];
}
