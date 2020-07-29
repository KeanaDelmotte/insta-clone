import Notifications from '../components/Notifications';
import { User } from './user';
import { PostInterface } from './post';

export enum NotificationType {
  LIKED_POST,
  LIKED_COMMENT,
  FOLLOWED,
  COMMENTED,
  REPLIED,
  LIKED_REPLY,
  TAGGED,
  REPLIED_TO_COMMENT,
}

export interface Notification {
  id: string;
  type: NotificationType;
  initiator: User;
  receiver: User;
  date: Date;
  post?: PostInterface;
  commentContent?: string;
  replyContent?: string;
}
