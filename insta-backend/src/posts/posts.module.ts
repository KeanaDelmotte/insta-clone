import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsRepository } from './posts.repository';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { Comment } from './comment.entity';
import { UserRepository } from '../auth/user.repository';
import { Reply } from './reply.entity';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostsRepository, Comment, UserRepository, Reply]),
    PassportModule,
    AuthModule,
    MulterModule.register({ dest: './files' }),
    NotificationsModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
