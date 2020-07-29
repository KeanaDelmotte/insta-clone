import React from 'react';
import SuggestedUser from './SuggestedUser';
import { User } from '../interfaces/user';
import { SuggestedUserInterface } from '../interfaces/suggestedUser';
import './SuggestedPeople.scss';
interface SuggestedPeopleProps {
  followUser: (userId: string) => void;
  users: User[] | undefined;
  suggestedUsers: SuggestedUserInterface[] | undefined;
}
const SuggestedPeople: React.FC<SuggestedPeopleProps> = ({
  suggestedUsers,
  users,
  followUser,
}) => {
  return (
    <div className="users_suggested">
      <h2 className="suggested_heading">Suggested For You</h2>
      <div className="suggested_userlist">
        {users?.map((user: User) => {
          let userSuggested = suggestedUsers?.find(
            (u) => u.user.id === user.id,
          );

          return (
            <SuggestedUser
              key="user.id"
              btnfiled={true}
              user={
                userSuggested
                  ? userSuggested
                  : {
                    user,
                    suggestion: {
                      priority: 4,
                      reason: 'Suggested for you',
                    },
                  }
              }
              followUser={followUser}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SuggestedPeople;
