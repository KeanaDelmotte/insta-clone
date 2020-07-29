import React, { useState } from 'react';
import { fetchWithAuth, retrieveToken } from '../helpers/auth';
import { Redirect, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useLoggedInUser } from '../contexts/UserContext';
import './Signin.scss';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { JwtPayload } from '../interfaces/jwtpayload';

interface SignInProps {}
const SignIn: React.FC<SignInProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const user = useAuth();
  const History = useHistory();
  const { loggedInUser, setLoggedInUser } = useLoggedInUser();
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
      const [_, payload] = signInRespBody.accessToken.split('.');
      const user: JwtPayload = JSON.parse(atob(payload));

      const userResp = await fetchWithAuth(
        `http://localhost:3001/auth/user/${user.username}`,
        retrieveToken(),
        {
          method: 'GET',
        },
      );
      const userR = await userResp.json();

      setLoggedInUser(userR);
    }
  };

  if (loggedInUser) {
    return <Redirect to="/home" />;
  }
  return (
    <>
      <div className="signin">
        <img
          src="/img/instagram-text-logo.webp"
          alt="instagram logo"
          className="instagram-text-logo"
        />
        <form
          onSubmit={(event) => {
            event.preventDefault();
            SignIn();
          }}
          className="signin-form"
        >
          <input
            className="signin-form_input"
            type="text"
            placeholder="Username or email"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="signin-form_input"
            type="text"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={() => {}}>
            Sign In
          </button>
        </form>
      </div>
      <Link to="/signup">
        <button type="submit">Don't have an account? Sign up</button>
      </Link>
    </>
  );
};

export default SignIn;
