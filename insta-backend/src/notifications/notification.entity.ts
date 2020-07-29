import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { Post } from '../posts/post.entity';

export enum NotificationType {
  LIKED_POST,
  LIKED_COMMENT,
  FOLLOWED,
  COMMENTED,
  REPLIED,
  LIKED_REPLY,
  TAGGED,
  REPLIED_TO_COMMENT,
}
@Entity()
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  type: NotificationType;

  @Column({ nullable: true })
  commentContent?: string;

  @ManyToOne(
    type => User,
    user => user.notificationsInitiated,
  )
  initiator: User;

  @ManyToOne(
    type => User,
    user => user.notifications,
  )
  receiver: User;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(
    type => Post,
    post => post.notifications,
    { nullable: true },
  )
  post?: Post;
}
