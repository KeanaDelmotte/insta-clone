import React, { useState } from 'react';
import { fetchWithAuth, retrieveToken } from '../helpers/auth';
import { useAuth } from '../hooks/useAuth';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

interface SignInProps { }
const SignIn: React.FC<SignInProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = useAuth();
  const SignIn = async () => {
    const signInResp = await fetchWithAuth(
      `http://localhost:3001/auth/signin`,
      retrieveToken(),
      {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      },
    );
    const signInRespBody: {
      accessToken: string;
    } = await signInResp.json();

    if (signInRespBody.accessToken) {
      localStorage.setItem('accessToken', signInRespBody.accessToken);
    }
  };
  if (user) {
    return <Redirect to="/home" />;
  }
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          SignIn();
        }}
      >
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="text"
          placeholder="Pasword"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={() => { }}>
          Sign In
        </button>
      </form>
      <Link to="/signup">
        <button type="submit">Don't have an account? Sign up</button>
      </Link>
    </>
  );
};

export default SignIn;
