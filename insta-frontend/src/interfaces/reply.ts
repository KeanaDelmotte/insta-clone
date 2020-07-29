import { User } from './user';
export interface ReplyInterface {
  id: number;
  contents: string;
  comment: Comment;
  user: User;
  likes: User[];
  timeCreated: Date;
}
