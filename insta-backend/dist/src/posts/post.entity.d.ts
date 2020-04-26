import { BaseEntity } from 'typeorm';
import { User } from '../auth/user.entity';
import { Photo } from './photo.entity';
import { Comment } from './comment.entity';
export declare class Post extends BaseEntity {
    id: string;
    description: string;
    photos: Photo[];
    user: User;
    likes: User[];
    comments: Comment[];
    saves: User[];
    tags: User[];
}
