import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from '../auth/user.entity';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetPostDto } from './dto/getposts.dto';
export declare class PostsRepository extends Repository<Post> {
    getAllPosts(filterDto: GetPostDto): Promise<Post[]>;
    comment(postId: number, createCommentDto: CreateCommentDto, user: User): Promise<Comment>;
}
