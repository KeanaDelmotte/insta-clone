import React from 'react';
import { fetchWithAuth, retrieveToken } from '../../helpers/auth';
import cn from 'classnames';
import { User } from '../../interfaces/user';
import SuggestedUser from '../SuggestedUser';
import { SuggestedUserInterface } from '../../interfaces/suggestedUser';
import { useLoggedInUser } from '../../contexts/UserContext';
import './FollowBtn.scss';
interface FollowButtonProps {
  btnfilled: boolean;
  user: SuggestedUserInterface | undefined;
}

const FollowButton: React.FC<FollowButtonProps> = ({ user, btnfilled }) => {
  const followUser = (userId: string) => {
    fetchWithAuth(`http://localhost:3001/follow/${userId}`, retrieveToken(), {
      method: 'POST',
    });
  };
  const unFollowUser = (userId: string) => {
    fetchWithAuth(
      `http://localhost:3001/follow/${userId}/unfollow`,
      retrieveToken(),
      { method: 'PATCH' },
    );
  };

  const { loggedInUser, setLoggedInUser } = useLoggedInUser();
  return (
    <button
      className={cn(
        { 'user_follow--blue-text': !btnfilled },
        { user_follow: btnfilled },
        {
          'user--following': loggedInUser?.following.find(
            (u) => u.id === user?.user.id,
          ),
        },
      )}
      onClick={() => {
        if (user && loggedInUser?.following) {
          if (loggedInUser.following.find((u) => u.id === user.user.id)) {
            unFollowUser(user.user.id);
            setLoggedInUser({
              ...loggedInUser,
              following: [
                ...loggedInUser.following.filter((u) => u.id !== user.user.id),
              ],
            });
          } else {
            followUser(user?.user.id);
            setLoggedInUser({
              ...loggedInUser,
              following: [...loggedInUser?.following, { ...user.user }],
            });
          }
        }
      }}
    >
      {loggedInUser?.following.find((u) => u.id === user?.user.id) &&
        'Following'}
      {!loggedInUser?.following.find((u) => u.id === user?.user.id) && 'Follow'}
    </button>
  );
};

export default FollowButton;
