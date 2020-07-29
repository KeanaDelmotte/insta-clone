import React from 'react';
import { useLocation } from 'react-router-dom';
import { GetProfileImage } from '../helpers/getimage';
import cn from 'classnames';
import { User } from '../interfaces/user';

interface ProfileIconProps {
  user: User | undefined;
}
const ProfileIcon: React.FC<ProfileIconProps> = ({ user }) => {
  const location = useLocation();
  return (
    <button
      onClick={() => {}}
      className={cn('nav_button', {
        'nav_selected--profile':
          location.pathname === `/profile/${user?.username}`,
      })}
    >
      <img
        src={GetProfileImage(user)}
        alt={user?.username}
        className="  profile_button"
      />
    </button>
  );
};

export default ProfileIcon;
