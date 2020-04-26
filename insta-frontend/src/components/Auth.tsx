import React from 'react';

interface AuthProps {}
const Auth: React.FC<AuthProps> = () => {
  return (
    <form action="#">
      <input
        type="text"
        placeholder="Username"
        minLength={4}
        maxLength={20}
        required
      />

      <input
        type="password"
        placeholder="Password"
        minLength={8}
        maxLength={100}
        required
      />
    </form>
  );
};
export default Auth;
