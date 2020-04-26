import { BaseEntity } from 'typeorm';
import { Post } from '../posts/post.entity';
import { Comment } from '../posts/comment.entity';
import { Reply } from '../posts/reply.entity';
export declare class User extends BaseEntity {
    id: number;
    username: string;
    password: string;
    salt: string;
    posts?: Post[];
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
}
