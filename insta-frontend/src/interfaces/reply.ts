import { User } from './user';
export interface Reply {
  id: number;
  contents: string;
  comment: Comment;
  user: User;
  likes: User[];
}
