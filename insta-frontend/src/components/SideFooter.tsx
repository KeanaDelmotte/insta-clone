import React from 'react';
import { User } from '../interfaces/user';
import SuggestedUser from './SuggestedUser';
import './SideFooter.scss';
import { GetProfileImage } from '../helpers/getimage';
import { SuggestedUserInterface } from '../interfaces/suggestedUser';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
interface SideFooterProps {
  suggestedUsers: SuggestedUserInterface[] | undefined;
  className: string;
  user: User | undefined;
  postsRef: React.RefObject<HTMLDivElement>;
  followUser: (userId: string) => void;
}
const SideFooter: React.FC<SideFooterProps> = ({
  suggestedUsers,
  className,
  user,
  postsRef,
  followUser,
}) => {
  const [offset, setOffset] = useState(0);
  console.log(suggestedUsers);
  useEffect(() => {
    const CalculateOffset = () => {
      const postsBounding = postsRef.current?.getBoundingClientRect();

      if (postsBounding) {
        const offSet = postsBounding.x + postsBounding.width + 20;
        setOffset(offSet);
      } else {
        console.error('Invalid ref');
        setOffset(0);
      }
    };
    CalculateOffset();
    window.addEventListener('resize', CalculateOffset);

    return () => {
      window.removeEventListener('resize', CalculateOffset);
    };
  }, [offset, postsRef]);
  return (
    <div className={`sidefooter ${className}`} style={{ left: offset }}>
      <div className="sidefooter_user">
        <img
          src={GetProfileImage(user)}
          alt={user?.username}
          className="sidefooter_user_profile-image"
        />
        <p className="sidefooter_user_username">
          {user?.username}
          {user?.name && (
            <span className="sidefooter_user_name">{user?.name}</span>
          )}
        </p>
      </div>

      <div className="sidefooter_actions">
        <p className="actions_info">Suggestions For You</p>
        <Link to="explore/people/suggested" className="link-to">
          <button className="actions_see-all">See All</button>
        </Link>
      </div>
      {suggestedUsers && (
        <div className="sidefooter_suggestions">
          {suggestedUsers.slice(0, 5).map((user) => (
            <SuggestedUser
              user={user}
              btnfiled={false}
              followUser={followUser}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SideFooter;
