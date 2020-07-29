import { User } from './user';
import { Photo } from './photo';
import { CommentInterface } from './comment';
import { PostLike } from './postLike';
export interface PostInterface {
  user: User;
  id: number;
  description: string;
  photos: Photo[];
  likes: PostLike[];
  comments: CommentInterface[];
  timeCreated: string;
}
