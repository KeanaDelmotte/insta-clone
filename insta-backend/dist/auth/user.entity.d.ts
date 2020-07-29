import { BaseEntity } from 'typeorm';
import { Post } from '../posts/post.entity';
import { Comment } from '../posts/comment.entity';
import { Reply } from '../posts/reply.entity';
import { Notification } from '../notifications/notification.entity';
import { ProfilePhoto } from './profilePhoto.entity';
export declare class User extends BaseEntity {
    dateJoined: Date;
    id: number;
    username: string;
    name?: string;
    password: string;
    salt: string;
    profilePhoto: ProfilePhoto;
    posts: Post[];
    validatePassword(password: string): Promise<boolean>;
    likedPosts: Post[];
    comments: Comment[];
    likedComments: Comment[];
    followers: User[];
    following: User[];
    replies: Reply[];
    likedReplies: Reply[];
    savedPosts: Post[];
    taggedIn: Post[];
    notifications: Notification[];
    notificationsInitiated: Notification[];
}
