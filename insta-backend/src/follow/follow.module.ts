import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { UserRepository } from '../auth/user.repository';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    UserRepository,
    PassportModule,
    AuthModule,
    TypeOrmModule.forFeature([UserRepository]),
    NotificationsModule,
  ],
  controllers: [FollowController],
  providers: [FollowService],
  exports: [FollowService],
})
export class FollowModule {}
