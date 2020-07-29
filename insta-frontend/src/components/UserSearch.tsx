import React, { useState } from 'react';

interface UserSearchProps { }

const UserSearch: React.FC<UserSearchProps> = () => {
  const [user, setUser] = useState('');

  const getUserByUsername = async (username: string) => {
    const getUserResp = await fetch(`http:/localhost:3001/auth/user/${username}`, {
      method: 'GET',
    });

    return getUserResp;
  };

  return (
    <form action="#" onSubmit={() => getUserByUsername(user)}>
      <input
        type="text"
        placeholder="Search for user"
        onChange={(e) => setUser(e.target.value)}
      />
    </form>
  );
};
