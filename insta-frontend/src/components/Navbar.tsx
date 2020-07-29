import React from 'react';
import { Link, } from 'react-router-dom';
import './Navbar.scss';
import HomeIcon from '../icons/home.icon';
import ExploreIcon from '../icons/explore.icon';
import { useState } from 'react';
import Notifications from './Notifications';
import NotificationsIcon from '../icons/notifications.icon';
import DirectMessageIcon from '../icons/directmessage.icon';
import ProfileIcon from './profileIcon';
import { useLoggedInUser } from '../contexts/UserContext';

interface NavbarProps {
  followUser: (userId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ followUser }) => {
  const { loggedInUser } = useLoggedInUser()
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
          <button className="nav_button" onClick={() => { }}>
            <DirectMessageIcon height={22} width={22} />
          </button>
        </Link>

        <Link to="/discover" className="nav_item">
          <button className="nav_button">
            <ExploreIcon height={22} width={22} />
          </button>
        </Link>


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
              followUser={followUser}
            />
          )}
        </button>

        <Link to={`/profile/${loggedInUser?.username}`} className="nav_item">
          <ProfileIcon />
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
