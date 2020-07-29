import React, { SetStateAction } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.scss';
import HomeIcon from './icons/home.icon';
import ExploreIcon from './icons/explore.icon';
import LikeIcon from './icons/like.icon';
import ShareIcon from './icons/share.icon';
import { User } from '../interfaces/user';
import { useState } from 'react';
import Notifications from './Notifications';
import { GetProfileImage } from '../helpers/getimage';
import NotificationsIcon from './icons/notifications.icon';
import cn from 'classnames';
import DirectMessageIcon from './icons/directmessage.icon';
import ProfileIcon from './profileIcon';

interface NavbarProps {
  user: User | undefined;
  followUser: (userId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, followUser }) => {
  const [notificationPopup, setNotificationPopup] = useState(false);
  return (
    <div className="nav_wrapper">
      <nav className="nav">
        <Link to="/home" className="nav_logo--wrapper">
          <img
            src="/img/instagram-text-logo.webp"
            alt="text-logo"
            className="nav_logo"
          />
        </Link>

        <Link to="/home" className="nav_item">
          <button className="nav_button">
            <HomeIcon height={22} width={22} />
          </button>
        </Link>

        <Link to="/direct" className="nav_item">
          <button className="nav_button" onClick={() => {}}>
            <DirectMessageIcon height={22} width={22} />
          </button>
        </Link>

        <Link to="/discover" className="nav_item">
          <button className="nav_button">
            <ExploreIcon height={22} width={22} />
          </button>
        </Link>

        {/* <Link to="/createpost" className="nav_item">
        <button
          onClick={() => {
            setInCreatePost(true);
            setInHome(false);
            setInExplore(false);
            setInNotifications(false);
            setInProfile(false);
          }}
          className="nav_button"
        >
          Creat Post
        </button>
      </Link> */}

        {/* <Link to="/notifications" className="nav_item"> */}
        <button
          onClick={() => {
            setNotificationPopup(true);
          }}
          className="nav_button button--notifications "
        >
          <NotificationsIcon
            height={22}
            width={22}
            notificationsPopup={notificationPopup}
          />

          {notificationPopup && (
            <Notifications
              onClose={() => setNotificationPopup(false)}
              user={user}
              followUser={followUser}
            />
          )}
        </button>
        {/* </Link> */}

        <Link to={`/profile/${user?.username}`} className="nav_item">
          <ProfileIcon user={user} />
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
