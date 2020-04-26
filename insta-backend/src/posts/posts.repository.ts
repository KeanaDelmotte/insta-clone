import { EntityRepository, Repository } from 'typeorm';
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
    const query = this.createQueryBuilder('post');

    if (search) {
      query.andWhere('(post.description LIKE :search)', {
        search: `%${search}%`,
      });
    }

    try {
      const posts = await query.getMany();
      return posts;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async comment(
    postId: number,
    createCommentDto: CreateCommentDto,
    user: User,
  ): Promise<Comment> {
    const comment = new Comment();
    const post: Post = await this.findOne(postId, { relations: ['comments'] });

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
