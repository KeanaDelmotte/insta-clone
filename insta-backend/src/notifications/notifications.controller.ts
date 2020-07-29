import {
  Controller,
  Get,
  UseGuards,
  Post,
  Delete,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { NotificationsService } from './notifications.service';
import { Param } from '@nestjs/common';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Get()
  @UseGuards(AuthGuard())
  getAllUserNotifications(@GetUser() user: User) {
    return this.notificationsService.getAllUserNotifications(user);
  }

  @Delete('/delete/:notificationId')
  @UseGuards(AuthGuard())
  deleteNotification(
    @GetUser() reqUser: User,
    @Param('notificationId', ParseIntPipe) notificationId: number,
  ) {
    return this.notificationsService.deleteNotification(
      reqUser,
      notificationId,
    );
  }
}
