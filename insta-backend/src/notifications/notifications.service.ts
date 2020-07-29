import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { Notification, NotificationType } from './notification.entity';
import { Post } from '../posts/post.entity';
import { UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../auth/user.repository';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getAllUserNotifications(user: User) {
    return this.notificationRepository.find({ where: { receiver: user } });
  }

  async createNotification(
    initiator: User,
    receiver: User,
    type: NotificationType,
    post?: Post,
    commentContent?: string,
  ) {
    console.log('in', receiver);

    if (!receiver) {
      throw new NotFoundException(`Receiving user does not exist`);
    } else if (receiver.id === initiator.id) {
      return;
    }

    const notification = new Notification();

    if (commentContent) {
      notification.commentContent = commentContent;
    }
    if (post) {
      notification.post = post;
    }
    notification.initiator = initiator;
    notification.receiver = receiver;
    notification.type = type;

    try {
      await notification.save();
    } catch (error) {
      throw new InternalServerErrorException('Could not create notification');
    }

    return notification;
  }

  async deleteNotification(reqUser: User, notificationId: number) {
    const notification = await this.notificationRepository.findOne(
      notificationId,
      {
        relations: ['initiator'],
      },
    );
    let user = await this.userRepository.findOne(reqUser.id, {
      relations: ['notifications'],
    });
    if (user.id !== notification.initiator.id) {
      throw new UnauthorizedException(
        `You arent authorized to delete this notification`,
      );
    } else {
      await notification.remove();
      // await notification.save();
    }
    // return notification;
  }
}
