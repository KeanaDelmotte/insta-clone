import { PostInterface } from './post';
export interface Photo {
  url: string;
  post: PostInterface;
  id: number;
  filename: string;
}
