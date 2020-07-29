import { EntityRepository, Repository, Like } from 'typeorm';
import { Post } from './post.entity';
import { Photo } from './photo.entity';
import {
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../auth/user.entity';
import { PhotoResponseDto } from './dto/photo-response.dto';
import { Comment } from './comment.entity';
import { PostsService } from './posts.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetPostDto } from './dto/getposts.dto';
import { UserRepository } from '../auth/user.repository';
@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
  async getAllPosts(filterDto: GetPostDto): Promise<Post[]> {
    const { search } = filterDto;

    if (search) {
      const posts = await this.find({
        relations: [
          'user',
          'likes',
          'comments',
          'comments.replies',
          'comments.likes',
          'comments.replies.user',
        ],
        where: {
          description: Like(`%${search}%`),
        },
      });
      return posts;
    }
    const posts = await this.find({
      relations: [
        'user',
        'likes',
        'comments',
        'comments.replies',
        'comments.likes',
        'comments.replies.user',
      ],
    });

    return posts;
  }
  async comment(
    postId: number,
    createCommentDto: CreateCommentDto,
    user: User,
  ): Promise<Comment> {
    const comment = new Comment();
    const post: Post = await this.findOne(postId, {
      relations: ['comments', 'user'],
    });

    if (post) {
      comment.contents = createCommentDto.contents;
      comment.user = user;
      comment.post = post;
    } else {
      throw new NotFoundException('Post does not exist');
    }

    try {
      await comment.save();
    } catch (error) {
      throw new InternalServerErrorException('Could not post comment');
    }

    return comment;
  }
}
