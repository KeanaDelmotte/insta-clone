import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsRepository } from './posts.repository';
import { User } from '../auth/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { Photo } from './photo.entity';
import { PhotoResponseDto } from './dto/photo-response.dto';
import { Post } from './post.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { GetPostDto } from './dto/getposts.dto';
import { UserRepository } from '../auth/user.repository';
import { Reply } from './reply.entity';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';

import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '../notifications/notification.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsRepository)
    private postsRepository: PostsRepository,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Reply)
    private replyRepository: Repository<Reply>,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private notificationService: NotificationsService,
  ) {}

  async createPost(
    createPostDto: CreatePostDto,
    user: User,
    photos: PhotoResponseDto[],
  ): Promise<Post> {
    const reqUser = await this.userRepository.findOne(user.id);
    const { description, tags } = createPostDto;

    const tagged: string[] = tags ? JSON.parse(tags) : [];

    if (photos.length < 1 || !description) {
      throw new BadRequestException(
        'You need to select a photo and include a description to upload',
      );
    }

    const taggedUsers: User[] = await Promise.all(
      tagged.map(async tag => {
        const user = await this.userRepository.findOne({ username: tag });

        if (user === undefined) {
          throw new ForbiddenException(
            `User with username ${tag} does not exist`,
          );
        }
        return user;
      }),
    );
    if (taggedUsers.find(tag => tag.id === user.id)) {
      throw new ForbiddenException('You cant tag yourself');
    }

    const post = new Post();
    post.tags = [...taggedUsers];

    post.description = description;
    post.user = user;

    reqUser.taggedIn = [...reqUser.taggedIn, post];

    const newPhotos = photos.map(photo => {
      const newPhoto = new Photo();
      newPhoto.filename = photo.filename;
      newPhoto.url = photo.path;
      newPhoto.post = post;

      return newPhoto;
    });
    post.photos = newPhotos;

    try {
      await post.save();
      await user.save();
    } catch (error) {
      throw new InternalServerErrorException('Unable to create post');
    }

    try {
      await Promise.all(newPhotos.map(photo => photo.save()));
    } catch (error) {
      throw new InternalServerErrorException('could not save photos');
    }

    if (tagged.length >= 1) {
      await Promise.all(
        taggedUsers.map(u => {
          this.notificationService.createNotification(
            user,
            u,
            NotificationType.TAGGED,
            post,
          );
        }),
      );
    }

    return post;
  }

  async getAllPostTags(postId: number) {
    const post = await this.postsRepository.findOne(postId, {
      relations: ['tags'],
    });

    if (!post) {
      throw new NotFoundException(`Post with id ${postId} does not exist`);
    }

    return post.tags.map(tag => ({ username: tag.username, id: tag.id }));
  }
  async deletePost(postId: number, reqUser: User) {
    const post = await this.getPostById(postId);
    if (!post) {
      throw new NotFoundException(`Post with id ${postId} does not exist`);
    }

    const user = await this.userRepository.findOne(reqUser.id, {
      relations: ['posts'],
    });

    if (post.user.id !== user.id) {
      throw new UnauthorizedException('You can only delete your own posts');
    }

    await post.remove();
  }

  async getAllPosts(filterDto: GetPostDto): Promise<Post[]> {
    return this.postsRepository.getAllPosts(filterDto);
  }

  async getAllRelevantPosts(user) {
    const posts = await this.postsRepository.find({
      relations: [
        'user',
        'user.followers',
        'user.profilePhoto',
        'likes',
        'comments',
        'comments.user',
        'comments.user.profilePhoto',
        'comments.replies',
        'comments.replies.user',
      ],
    });
    const relevantPosts = [];
    posts.forEach(post => {
      if (post.user.followers.find(u => u.id === user.id)) {
        relevantPosts.push(post);
      } else if (post.likes.length > 100) {
        relevantPosts.push(post);
      } else if (post.user.followers.length > 100) {
        relevantPosts.push(post);
      }
    });

    return relevantPosts;
  }

  async getAllUserPosts(userId: number): Promise<Post[]> {
    const user = await this.userRepository.findOne(userId, {
      relations: [
        'posts',
        'posts.comments',
        'posts.likes',
        'posts.comments.replies',
        'posts.comments.replies.user',
        'posts.user',
      ],
    });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} does not exist`);
    }
    return user.posts;
  }
  async getPostById(
    id: number,
    relations = [
      'comments',
      'comments.likes',
      'likes',
      'photos',
      'user',
      'saves',
      'tags',
      'user.posts',
    ],
  ): Promise<Post> {
    const post = await this.postsRepository.findOne(id, {
      relations: relations,
    });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} does not exist`);
    }
    return post;
  }

  async likePost(postId: number, user: User): Promise<Post> {
    const post = await this.getPostById(postId, ['likes', 'user']);

    const userLikedpost = post.likes.find(u => u.id === user.id);
    if (!userLikedpost) {
      post.likes = [...post.likes, user];
    } else {
      throw new ForbiddenException("You can't like a post more than once");
    }

    try {
      await post.save();
    } catch (error) {
      throw new InternalServerErrorException('Could not like post');
    }

    await this.notificationService.createNotification(
      user,
      post.user,
      NotificationType.LIKED_POST,
      post,
    );
    return post;
  }

  async unlikePost(postId, user): Promise<void> {
    const post = await this.getPostById(postId, ['likes']);

    post.likes = post.likes.filter(like => like.id !== user.id);

    try {
      await post.save();
    } catch (error) {
      throw new InternalServerErrorException('could not unlike post');
    }
  }

  async getAllPostLikes(postId: number): Promise<User[]> {
    const post = await this.getPostById(postId, ['likes']);

    if (!post) {
      throw new NotFoundException(`Post with id ${postId} does not exist`);
    }
    return post.likes;
  }

  async savePost(postId, reqUser: User) {
    const post = await this.getPostById(postId);

    const user = await this.userRepository.findOne(reqUser.id, {
      relations: ['savedPosts'],
    });
    const postSaved = user.savedPosts.find(p => p.id === post.id);
    if (postSaved) {
      throw new ForbiddenException("You've already saved this post");
    }
    user.savedPosts = [...user.savedPosts, post];

    post.saves = [...post.saves, user];

    try {
      await post.save();
      await user.save();
    } catch (error) {
      throw new InternalServerErrorException('Could not save post');
    }

    return user.savedPosts;
  }

  async unsavePost(postId, reqUser: User) {
    const post = await this.postsRepository.findOne(postId);

    if (!post) {
      throw new NotFoundException(`Post with id ${postId} does not exist`);
    }
    const user = await this.userRepository.findOne(reqUser.id, {
      relations: ['savedPosts'],
    });

    if (!user.savedPosts.find(p => p.id === post.id)) {
      throw new ForbiddenException(
        `You dont have any posts with id ${postId} saved`,
      );
    }

    user.savedPosts = user.savedPosts.filter(p => p.id !== post.id);

    try {
      await user.save();
    } catch (error) {
      throw new InternalServerErrorException(
        'Could not remove post from saved posts',
      );
    }
  }

  async comment(
    postId: number,
    createCommentDto: CreateCommentDto,
    user: User,
  ): Promise<Comment> {
    const reqUser = await this.userRepository.findOne(user.id, {
      relations: ['profilePhoto'],
    });
    const comment = await this.postsRepository.comment(
      postId,
      createCommentDto,
      reqUser,
    );
    console.log(`notification thing`, comment.post.user);

    await this.notificationService.createNotification(
      user,
      comment.post.user,
      NotificationType.COMMENTED,
      comment.post,
      comment.contents,
    );
    return comment;
  }

  async deleteComment(commentId, user: User): Promise<void> {
    const removingcomment = await this.commentRepository.findOne(commentId, {
      relations: ['user', 'post', 'replies'],
    });
    const commentCreator = removingcomment.user;
    if (user.id !== commentCreator.id) {
      throw new ForbiddenException(`You cant delete someone else's comment`);
    }

    await removingcomment.remove();
  }
  async getAllComments(postId: number): Promise<Comment[]> {
    const post = await this.getPostById(postId, [
      'comments',
      'comments.replies',
      // 'comments.user.profilePhoto',
    ]);
    // console.log(post.comments[0].user.profilePhoto);

    return post.comments;
  }

  async getCommentById(commentId: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne(commentId, {
      relations: [
        'replies',
        'likes',
        'user',
        'user.profilePhoto',
        'replies.user',
      ],
    });
    if (!comment) {
      throw new NotFoundException(
        `Comment with id ${commentId} does not exist`,
      );
    }
    return comment;
  }

  async likeComment(commentId: number, reqUser: User) {
    const user = await this.userRepository.findOne(reqUser.id, {
      relations: ['likedComments'],
    });
    const comment = await this.commentRepository.findOne(commentId, {
      relations: ['likes', 'post', 'post.user'],
    });

    if (!comment) {
      throw new NotFoundException(
        `Comment with id ${commentId} does not exist`,
      );
    }

    const userLikedComment = comment.likes.find(u => u.id === reqUser.id);
    if (!userLikedComment) {
      user.likedComments = [...user.likedComments, comment];
      try {
        await user.save();
      } catch (error) {
        throw new InternalServerErrorException('Could not save likes');
      }
      comment.likes = [...comment.likes, user];
    } else {
      throw new ForbiddenException("You can't like a comment more than once");
    }
    try {
      await comment.save();
    } catch (error) {
      throw new InternalServerErrorException('Could not save like');
    }
    this.notificationService.createNotification(
      reqUser,
      comment.user,
      NotificationType.LIKED_COMMENT,
      comment.post,
    );
    return comment.likes;
  }

  async unlikeComment(commentId: number, reqUser: User) {
    const user = await this.userRepository.findOne(reqUser.id, {
      relations: ['likedComments'],
    });
    const comment = await this.commentRepository.findOne(commentId, {
      relations: ['likes'],
    });

    if (!comment) {
      throw new NotFoundException(
        `Comment with id ${commentId} does not exist`,
      );
    }
    user.likedComments = user.likedComments.filter(
      likedcomment => likedcomment.id !== comment.id,
    );

    try {
      await user.save();
    } catch (error) {
      throw new InternalServerErrorException('Could not save likes');
    }

    comment.likes = comment.likes.filter(
      commentlike => commentlike.id !== user.id,
    );
    try {
      await comment.save();
    } catch (error) {
      throw new InternalServerErrorException('Could not save like');
    }

    return comment.likes;
  }

  async replyToComment(
    commentId: number,
    reqUser: User,
    createCommentDto: CreateCommentDto,
  ) {
    const { contents } = createCommentDto;
    const comment = await this.commentRepository.findOne(commentId, {
      relations: ['replies', 'post', 'post.user'],
    });
    if (!comment) {
      throw new NotFoundException(
        `Comment with id ${commentId} does not exist`,
      );
    }

    const user = await this.userRepository.findOne(reqUser.id, {
      relations: ['replies'],
    });

    const reply = new Reply();

    reply.user = user;
    reply.contents = contents;
    reply.inReplyTo = comment;

    comment.replies = [...comment.replies, reply];
    user.replies = [...user.replies, reply];
    try {
      await reply.save();
      await comment.save();
      await user.save();
    } catch (error) {
      throw new InternalServerErrorException('Could not reply to comment');
    }

    this.notificationService.createNotification(
      reqUser,
      reply.inReplyTo.user,
      NotificationType.REPLIED_TO_COMMENT,
      comment.post,
      reply.contents,
    );
    return reply;
  }

  async getAllCommentReplies(commentId) {
    const comment = await this.getCommentById(commentId);

    if (!comment) {
      throw new NotFoundException(
        `Comment with id ${commentId} does not exist`,
      );
    }

    return comment.replies;
  }

  async deleteReply(replyId: number, reqUser: User) {
    const reply = await this.replyRepository.findOne(replyId, {
      relations: ['user'],
    });

    if (!reply) {
      throw new NotFoundException(`Reply with id ${replyId} does not exist`);
    }

    if (reply.user.id !== reqUser.id) {
      throw new UnauthorizedException(`You can only delete your own replies`);
    }

    await reply.remove();
  }

  async likeReply(replyId: number, reqUser: User) {
    const reply = await this.replyRepository.findOne(replyId, {
      relations: ['likes', 'inReplyTo'],
    });
    if (!reply) {
      throw new NotFoundException(
        'The reply you are trying to like does not exist',
      );
    }
    const user = await this.userRepository.findOne(reqUser.id, {
      relations: ['likedReplies'],
    });

    const userLikedReply = reply.likes.find(u => u.id === user.id);

    if (!userLikedReply) {
      reply.likes = [...reply.likes, user];

      user.likedReplies = [...user.likedReplies, reply];
    } else {
      throw new ForbiddenException("You can't like a reply more than once");
    }

    try {
      await user.save();
      await reply.save();
    } catch (error) {
      throw new InternalServerErrorException('Could not like reply');
    }

    this.notificationService.createNotification(
      reqUser,
      reply.user,
      NotificationType.LIKED_REPLY,
      reply.inReplyTo.post,
      reply.contents,
    );
    return reply.likes;
  }

  async unlikeReply(replyId: number, reqUser: User) {
    const reply = await this.replyRepository.findOne(replyId, {
      relations: ['likes'],
    });

    if (!reply.likes.find(user => user.id === reqUser.id)) {
      throw new BadRequestException(
        `You havent liked any replys with the id ${replyId}`,
      );
    }
    if (!reply) {
      throw new NotFoundException(
        'The reply you are trying to unlike does not exist',
      );
    }

    reply.likes = reply.likes.filter(like => like.id !== reqUser.id);

    try {
      await reply.save();
    } catch (error) {
      throw new InternalServerErrorException('Unable to unlike reply');
    }
  }
}
