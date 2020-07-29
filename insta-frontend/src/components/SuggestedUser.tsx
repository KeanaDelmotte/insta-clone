import React from 'react';
import { GetProfileImage } from '../helpers/getimage';
import './SuggestedUser.scss';
import { SuggestedUserInterface } from '../interfaces/suggestedUser';
import FollowButton from '../buttons/FollowBtn';
interface SuggestedUserProps {
  user: SuggestedUserInterface;
  btnfiled: boolean;
  followUser: (userId: string) => void;
}
const SuggestedUser: React.FC<SuggestedUserProps> = ({
  user,
  btnfiled,
}) => {
  return (
    <div className="suggested-user" key={user.user.id}>
      <img
        src={GetProfileImage(user.user)}
        alt={user.user.username}
        className="suggested-user_profile-image"
      />
      <p className="suggested-user_username">
        {user.user.username}

        <span className="reason-for-suggestion">{user.suggestion.reason}</span>
      </p>
      <FollowButton user={user} btnfilled={btnfiled} />
    </div>
  );
};
export default SuggestedUser;
