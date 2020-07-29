import { Photo } from './photo';
import { PostInterface } from './post';
import Notifications from '../components/Notifications';
import { likedPost } from './likedPost';
import { CommentInterface } from './comment';
export interface User {
  username: string;
  id: string;
  profilePhoto: Photo;
  following: User[];
  followers: User[];
  posts: PostInterface[];
  name: string;
  notifications: Notification[];
  savedPosts: PostInterface[];
  taggedIn: PostInterface[];
  likedPosts: likedPost[];
  likedComments: { id: number; contents: string; user: User }[];
}
