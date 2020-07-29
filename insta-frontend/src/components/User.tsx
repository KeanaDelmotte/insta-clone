import React from 'react';
import { Photo } from '../interfaces/photo';
import './User.scss';

interface UserDisplayProps {
  username: string;
  profilePicture: string;
}

const UserDisplay: React.FC<UserDisplayProps> = ({
  username,
  profilePicture,
}) => {
  return (
    <div className="user">
      <img
        src={profilePicture}
        alt={username}
        className="user_profile-picture"
      />
      <h2 className="user_username">{username}</h2>
    </div>
  );
};

export default UserDisplay;
