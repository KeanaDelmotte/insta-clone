import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../auth/user.repository';
import { User } from '../auth/user.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async followUser(userId: number, followerId: number): Promise<User[]> {
    const user = await this.userRepository.findOne(userId, {
      relations: ['followers'],
    });

    if (!user) {
      throw new NotFoundException(
        "The user you're trying to follow does not exist",
      );
    }
    const followerUser = await this.userRepository.findOne(followerId, {
      relations: ['following'],
    });

    if (user.id === followerUser.id) {
      throw new ForbiddenException('You cant follow yourself');
    }

    if (followerUser.following.find(u => u.id === user.id)) {
      throw new BadRequestException("You're already following this user.");
    }

    const userFollowing = user.followers.find(user => user.id === followerId);

    if (!userFollowing) {
      user.followers = [...user.followers, followerUser];

      try {
        await user.save();
      } catch (error) {
        throw new InternalServerErrorException('Could not save user');
      }

      followerUser.following = [...followerUser.following, user];

      try {
        await followerUser.save();
      } catch (error) {
        throw new InternalServerErrorException('Could not save follower');
      }
    }

    return followerUser.following;
  }

  async unfollowUser(userId: number, unfollower: User): Promise<User[]> {
    const user = await this.userRepository.findOne(userId, {
      relations: ['followers'],
    });

    user.followers = user.followers.filter(user => user.id !== unfollower.id);

    try {
      await user.save();
    } catch (error) {
      throw new InternalServerErrorException('Could not unfollow user');
    }

    return user.followers;
  }
  async getAllFollowers(userId: number): Promise<User[]> {
    const user = await this.userRepository.findOne(userId, {
      relations: ['followers'],
    });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} does not exist`);
    }
    return user.followers;
  }

  async getAllFollowing(userId: number): Promise<User[]> {
    const user = await this.userRepository.findOne(userId, {
      relations: ['following'],
    });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} does not exist`);
    }
    return user.following;
  }
}
