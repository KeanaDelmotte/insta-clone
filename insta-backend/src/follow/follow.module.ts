import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { UserRepository } from '../auth/user.repository';

@Module({
  imports: [
    UserRepository,
    PassportModule,
    AuthModule,
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [FollowController],
  providers: [FollowService],
})
export class FollowModule {}
