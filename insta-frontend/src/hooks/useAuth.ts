import { useEffect, useState } from 'react';
import { retrieveToken } from '../helpers/auth';
import { JwtPayload } from '../interfaces/jwtpayload';

export const useAuth = () => {
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const token = retrieveToken();

    if (token === undefined || token === null) {
      return;
    }
    const [_, payload] = token.split('.');
    setUser(JSON.parse(atob(payload)));
  }, []);

  return user;
};
