import { Photo } from './photo';
export interface likedPost {
  timeCreated: string | Date;
  description: string;
  id: number;
  photos: { filename: string; url: string; id: number }[];
}
