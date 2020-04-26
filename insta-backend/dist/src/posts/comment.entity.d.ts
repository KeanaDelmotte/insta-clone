import { BaseEntity } from 'typeorm';
import { User } from '../auth/user.entity';
import { Post } from './post.entity';
import { Reply } from './reply.entity';
export declare class Comment extends BaseEntity {
    id: number;
    contents: string;
    user: User;
    likes: User[];
    post: Post;
    replies: Reply[];
}
