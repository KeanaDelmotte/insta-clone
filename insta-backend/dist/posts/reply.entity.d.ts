import { BaseEntity } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from '../auth/user.entity';
export declare class Reply extends BaseEntity {
    id: number;
    contents: string;
    inReplyTo: Comment;
    user: User;
    likes: User[];
}
