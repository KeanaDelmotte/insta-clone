import {
  Entity,
  BaseEntity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { Photo } from './photo.entity';
import { Exclude, Transform } from 'class-transformer';
import { Comment } from './comment.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

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
    { eager: false },
  )
  @Exclude()
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
  )
  @JoinTable()
  @Transform((tags: User[]) => {
    const transformedTags = tags.map(tag => ({
      username: tag.username,
      id: tag.id,
    }));
    return transformedTags;
  })
  tags: User[];
}
