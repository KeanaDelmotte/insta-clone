import React, { SetStateAction, useContext } from 'react';
import { User } from '../interfaces/user';
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { fetchWithAuth, retrieveToken } from '../helpers/auth';

interface UserContextState {
  loggedInUser: User | undefined;
  setLoggedInUser: React.Dispatch<SetStateAction<User | undefined>>;
}

const UserContext = React.createContext<UserContextState>({
  loggedInUser: undefined,
  setLoggedInUser: () => { },
});

export const UserProvider: React.FC = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState<User | undefined>();
  const user = useAuth()?.username;
  useEffect(() => {
    if (user) {
      fetchWithAuth(
        `http://localhost:3001/auth/user/${user}`,
        retrieveToken(),
        {
          method: 'GET',
        },
      ).then(async (userResp) => {
        setLoggedInUser(await userResp.json());
      });
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useLoggedInUser = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  return { loggedInUser, setLoggedInUser };
};
