import {
  Controller,
  Post,
  Param,
  UseGuards,
  Get,
  Patch,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { FollowService } from './follow.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('follow')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
export class FollowController {
  constructor(private followService: FollowService) {}

  @Post(':userId')
  @UseGuards(AuthGuard())
  followUser(
    @Param('userId') userId: number,
    @GetUser()
    follower: User,
  ): Promise<User[]> {
    const followerId = follower.id;
    return this.followService.followUser(userId, followerId);
  }

  @Get(':userId/followers')
  getAllFollowers(@Param('userId') userId: number): Promise<User[]> {
    return this.followService.getAllFollowers(userId);
  }

  @Get(':userId/following')
  getAllFollowing(@Param('userId') userId: number): Promise<User[]> {
    return this.followService.getAllFollowing(userId);
  }

  @Patch(':userId/unfollow')
  @UseGuards(AuthGuard())
  unfollowUser(
    @Param('userId') userId: number,
    @GetUser() unfollower: User,
  ): Promise<User[]> {
    return this.followService.unfollowUser(userId, unfollower);
  }
}
