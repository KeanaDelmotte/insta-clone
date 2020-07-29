import React from 'react';
import { useLocation } from 'react-router-dom';
import { GetProfileImage } from '../helpers/getimage';
import cn from 'classnames';
import { User } from '../interfaces/user';
import { useLoggedInUser } from '../contexts/UserContext';

interface ProfileIconProps {
}
const ProfileIcon: React.FC<ProfileIconProps> = ({ }) => {
  const location = useLocation();
  const { loggedInUser } = useLoggedInUser()
  return (
    <button
      onClick={() => { }}
      className={cn('nav_button', {
        'nav_selected--profile':
          location.pathname === `/profile/${loggedInUser?.username}`,
      })}
    >
      <img
        src={GetProfileImage(loggedInUser)}
        alt={loggedInUser?.username}
        className="  profile_button"
      />
    </button>
  );
};

export default ProfileIcon;
