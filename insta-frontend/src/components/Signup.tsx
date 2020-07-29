import React, { useState } from 'react';
import './Signup.scss';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
interface SignUpProps {}
const SignUp: React.FC<SignUpProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const History = useHistory();
  const signUp = async () => {
    const signupResp = await fetch('http://localhost:3001/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (signupResp.status === 201) {
      History.push('/');
    }
  };

  return (
    <>
      <div className="signup">
        <div className="form_wrap">
          <img
            src="/img/instagram-text-logo.webp"
            alt="instagram logo"
            className="instagram-text-logo"
          />
          <div className="wrap_info">
            Sign up to see photos and videos from your friends.
          </div>
          <button className="login--facebook">Log in with Facebook</button>
          <div className="wrap_or">
            <hr className="or_line" />
            <p className="or_word">OR</p>
            <hr className="or_line" />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signUp();
            }}
            className="signup_form"
          >
            <input
              value={username}
              type="text"
              placeholder="Username"
              minLength={4}
              maxLength={20}
              required
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="text"
              placeholder="Password"
              minLength={8}
              maxLength={100}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="form_submit"
              // onClick={() => {
              //   signUp();
              // }}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <Link to="/">
        <div className="signin">
          Have an account?
          <button type="submit" onClick={() => {}} className="signin_button">
            Log in
          </button>
        </div>
      </Link>
    </>
  );
};
export default SignUp;
