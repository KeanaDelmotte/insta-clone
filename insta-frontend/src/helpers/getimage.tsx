import { User } from '../interfaces/user';
export const GetProfileImage = (user: User | undefined): string => {
  if (user && user?.profilePhoto !== null) {
    return `http://localhost:3001/public/${user?.profilePhoto.filename}`;
  } else {
    return `/img/no-profile.jpg`;
  }
};

export const GetPhoto = (filename: string): string => {
  return `http://localhost:3001/public/${filename}`;
};
