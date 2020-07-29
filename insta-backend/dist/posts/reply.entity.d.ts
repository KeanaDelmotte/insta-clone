import { BaseEntity } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from '../auth/user.entity';
export declare class Reply extends BaseEntity {
    timeCreated: Date;
    id: number;
    contents: string;
    inReplyTo: Comment;
    user: User;
    likes: User[];
}
