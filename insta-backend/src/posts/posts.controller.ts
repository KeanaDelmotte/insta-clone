import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  UseGuards,
  Get,
  Param,
  Res,
  ClassSerializerInterceptor,
  Patch,
  Query,
  Delete,
  NotFoundException,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto } from './dto/create-post.dto';
import { customFileName, imageFileFilter } from '../utils/post.utils';
import { diskStorage } from 'multer';
import { PhotoResponseDto } from './dto/photo-response.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ValidationPipe } from '@nestjs/common';
import { GetPostDto } from './dto/getposts.dto';

@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor)
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post('/upload')
  @UseGuards(AuthGuard())
  @UseInterceptors(
    FilesInterceptor('photos', 10, {
      storage: diskStorage({
        destination: './files',
        filename: customFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  createPost(
    @Body(ValidationPipe) createPostDto: CreatePostDto,
    @UploadedFiles() photos: PhotoResponseDto[],
    @GetUser() user: User,
  ) {
    return this.postsService.createPost(createPostDto, user, photos);
  }

  @Get(':postId/tags')
  getAllPostTags(@Param('postId', ParseIntPipe) postId: number) {
    return this.postsService.getAllPostTags(postId);
  }
  @Delete(':postId/delete')
  @UseGuards(AuthGuard())
  deletePost(
    @Param('postId', ParseIntPipe) postId: number,
    @GetUser() reqUser: User,
  ) {
    return this.postsService.deletePost(postId, reqUser);
  }

  @Get('image/:filename')
  seeUploadedFiles(@Param('filename') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }

  @Get()
  getAllPosts(@Query(ValidationPipe) filterDto: GetPostDto) {
    return this.postsService.getAllPosts(filterDto);
  }
  @Get('/relevant')
  @UseGuards(AuthGuard())
  getAllRelevantPosts(@GetUser() user: User) {
    return this.postsService.getAllRelevantPosts(user);
  }

  @Get(':id')
  getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  @Get('user/:userId/posts')
  getAllUserPosts(@Param('userId') userId: number) {
    return this.postsService.getAllUserPosts(userId);
  }
  @Patch(':postId/like')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  likePost(
    @Param('postId', ParseIntPipe) postId: number,
    @GetUser() user: User,
  ) {
    return this.postsService.likePost(postId, user);
  }

  @Patch(':postId/unlike')
  @UseGuards(AuthGuard())
  unlikePost(
    @Param('postId', ParseIntPipe) postId: number,
    @GetUser() user: User,
  ) {
    return this.postsService.unlikePost(postId, user);
  }

  @Post(':postId/save')
  @UseGuards(AuthGuard())
  savePost(
    @Param('postId', ParseIntPipe) postId: number,
    @GetUser() reqUser: User,
  ) {
    return this.postsService.savePost(postId, reqUser);
  }
  @Delete(':postId/unsave')
  @UseGuards(AuthGuard())
  unsavePost(
    @Param('postId', ParseIntPipe) postId: number,
    @GetUser() reqUser: User,
  ) {
    return this.postsService.unsavePost(postId, reqUser);
  }

  @Get(':postId/likes')
  getAllPostLikes(@Param('postId', ParseIntPipe) postId: number) {
    return this.postsService.getAllPostLikes(postId);
  }

  @Post('/:postId/comment')
  @UseGuards(AuthGuard())
  comment(
    @Param('postId', ParseIntPipe) postId: number,
    @Body(ValidationPipe) createCommentDto: CreateCommentDto,
    @GetUser() user: User,
  ) {
    return this.postsService.comment(postId, createCommentDto, user);
  }

  @Delete('comments/:commentId/delete')
  @UseGuards(AuthGuard())
  deleteComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @GetUser() user: User,
  ) {
    return this.postsService.deleteComment(commentId, user);
  }

  @Get(':postId/comments')
  getAllComments(@Param('postId', ParseIntPipe) postId: number) {
    return this.postsService.getAllComments(postId);
  }

  @Get('comments/:commentId')
  getCommentById(@Param('commentId', ParseIntPipe) commentId: string) {
    return this.postsService.getCommentById(commentId);
  }

  @Post('comments/:commentId/like')
  @UseGuards(AuthGuard())
  likeComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @GetUser(ValidationPipe) reqUser: User,
  ) {
    return this.postsService.likeComment(commentId, reqUser);
  }

  @Post('comments/:commentId/unlike')
  @UseGuards(AuthGuard())
  unlikeComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @GetUser(ValidationPipe) reqUser: User,
  ) {
    return this.postsService.unlikeComment(commentId, reqUser);
  }

  @Post('comments/:commentId/reply')
  @UseGuards(AuthGuard())
  replyToComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @GetUser(ValidationPipe) reqUser: User,
    @Body(ValidationPipe) createCommentDto: CreateCommentDto,
  ) {
    return this.postsService.replyToComment(
      commentId,
      reqUser,
      createCommentDto,
    );
  }
  @Get('comments/:commentId/replies')
  getAllCommentReplies(@Param('commentId', ParseIntPipe) commentId: number) {
    return this.postsService.getAllCommentReplies(commentId);
  }

  @Post('comments/replies/:replyId/like')
  @UseGuards(AuthGuard())
  likeReply(
    @Param('replyId', ParseIntPipe) replyId: number,
    @GetUser(ValidationPipe) reqUser: User,
  ) {
    return this.postsService.likeReply(replyId, reqUser);
  }

  @Post('comments/replies/:replyId/unlike')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  unlikeReply(
    @Param('replyId', ParseIntPipe) replyId: number,
    @GetUser(ValidationPipe) reqUser: User,
  ) {
    return this.postsService.unlikeReply(replyId, reqUser);
  }

  @Delete('comments/replies/:replyId/delete')
  @UseGuards(AuthGuard())
  deleteReply(
    @Param('replyId', ParseIntPipe) replyId: number,
    @GetUser() reqUser: User,
  ) {
    return this.postsService.deleteReply(replyId, reqUser);
  }
}
