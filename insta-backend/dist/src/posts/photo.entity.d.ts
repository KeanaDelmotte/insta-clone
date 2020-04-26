import { BaseEntity } from 'typeorm';
import { Post } from './post.entity';
export declare class Photo extends BaseEntity {
    url: string;
    post: Post;
    id: number;
    filename: string;
}
