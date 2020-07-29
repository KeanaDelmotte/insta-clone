import { User } from './user';
import { Reply } from './reply';
import { PostInterface } from './post';
export interface CommentInterface {
  post: PostInterface;
  id: number;
  contents: string;
  user: User;
  likes: User[];
  replies: Reply[];
}
