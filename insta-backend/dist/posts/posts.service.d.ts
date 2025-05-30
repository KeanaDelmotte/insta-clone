import { PostsRepository } from './posts.repository';
import { User } from '../auth/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PhotoResponseDto } from './dto/photo-response.dto';
import { Post } from './post.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { GetPostDto } from './dto/getposts.dto';
import { UserRepository } from '../auth/user.repository';
import { Reply } from './reply.entity';
import { NotificationsService } from '../notifications/notifications.service';
export declare class PostsService {
    private postsRepository;
    private commentRepository;
    private replyRepository;
    private userRepository;
    private notificationService;
    constructor(postsRepository: PostsRepository, commentRepository: Repository<Comment>, replyRepository: Repository<Reply>, userRepository: UserRepository, notificationService: NotificationsService);
    createPost(createPostDto: CreatePostDto, user: User, photos: PhotoResponseDto[]): Promise<Post>;
    getAllPostTags(postId: number): Promise<{
        username: string;
        id: number;
    }[]>;
    deletePost(postId: number, reqUser: User): Promise<void>;
    getAllPosts(filterDto: GetPostDto): Promise<Post[]>;
    getAllRelevantPosts(user: any): Promise<any[]>;
    getAllUserPosts(userId: number): Promise<Post[]>;
    getPostById(id: number, relations?: string[]): Promise<Post>;
    likePost(postId: number, user: User): Promise<Post>;
    unlikePost(postId: any, user: any): Promise<void>;
    getAllPostLikes(postId: number): Promise<User[]>;
    savePost(postId: any, reqUser: User): Promise<Post[]>;
    unsavePost(postId: any, reqUser: User): Promise<void>;
    comment(postId: number, createCommentDto: CreateCommentDto, user: User): Promise<Comment>;
    deleteComment(commentId: any, user: User): Promise<void>;
    getAllComments(postId: number): Promise<Comment[]>;
    getCommentById(commentId: string): Promise<Comment>;
    likeComment(commentId: number, reqUser: User): Promise<User[]>;
    unlikeComment(commentId: number, reqUser: User): Promise<User[]>;
    replyToComment(commentId: number, reqUser: User, createCommentDto: CreateCommentDto): Promise<Reply>;
    getAllCommentReplies(commentId: any): Promise<Reply[]>;
    deleteReply(replyId: number, reqUser: User): Promise<void>;
    likeReply(replyId: number, reqUser: User): Promise<User[]>;
    unlikeReply(replyId: number, reqUser: User): Promise<void>;
}
