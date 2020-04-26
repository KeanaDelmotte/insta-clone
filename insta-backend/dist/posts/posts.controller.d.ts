import { PostsService } from './posts.service';
import { User } from '../auth/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PhotoResponseDto } from './dto/photo-response.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetPostDto } from './dto/getposts.dto';
export declare class PostsController {
    private postsService;
    constructor(postsService: PostsService);
    createPost(createPostDto: CreatePostDto, photos: PhotoResponseDto[], user: User): Promise<import("./post.entity").Post>;
    getAllPostTags(postId: number): Promise<{
        username: string;
        id: number;
    }[]>;
    deletePost(postId: number, reqUser: User): Promise<void>;
    seeUploadedFiles(image: any, res: any): any;
    getAllPosts(filterDto: GetPostDto): Promise<import("./post.entity").Post[]>;
    getPostById(id: number): Promise<import("./post.entity").Post>;
    getAllUserPosts(userId: number): Promise<import("./post.entity").Post[]>;
    likePost(postId: number, user: User): Promise<import("./post.entity").Post>;
    unlikePost(postId: number, user: User): Promise<void>;
    savePost(postId: number, reqUser: User): Promise<import("./post.entity").Post[]>;
    unsavePost(postId: number, reqUser: User): Promise<void>;
    getAllPostLikes(postId: number): Promise<User[]>;
    comment(postId: number, createCommentDto: CreateCommentDto, user: User): Promise<import("./comment.entity").Comment>;
    deleteComment(commentId: number, user: User): Promise<void>;
    getAllComments(postId: number): Promise<import("./comment.entity").Comment[]>;
    getCommentById(commentId: string): Promise<import("./comment.entity").Comment>;
    likeComment(commentId: number, reqUser: User): Promise<User[]>;
    unlikeComment(commentId: number, reqUser: User): Promise<User[]>;
    replyToComment(commentId: number, reqUser: User, createCommentDto: CreateCommentDto): Promise<import("./reply.entity").Reply[]>;
    getAllCommentReplies(commentId: number): Promise<import("./reply.entity").Reply[]>;
    likeReply(replyId: number, reqUser: User): Promise<User[]>;
    unlikeReply(replyId: number, reqUser: User): Promise<void>;
    deleteReply(replyId: number, reqUser: User): Promise<void>;
}
