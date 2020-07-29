import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignUp from './components/Signup';
import SignIn from './components/Signin';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Discover from './components/Discover';
import CreatePost from './components/Createpost';
import Profile from './components/Profile';
import './App.scss';
import { useAuth } from './hooks/useAuth';
import { User } from './interfaces/user';
import { useEffect } from 'react';
import { fetchWithAuth, retrieveToken } from './helpers/auth';
import { SuggestedUserInterface } from './interfaces/suggestedUser';
import { PostInterface } from './interfaces/post';
import Message from './components/Message';
import AccountSettings from './components/AccountSettings';
import SuggestedPeople from './components/SuggestedPeople';
import PostFullView from './components/PostFullView';
const App = () => {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [relevantPosts, setRelevantPosts] = useState<PostInterface[]>();
  const [users, setUsers] = useState([]);
  const [comment, setComment] = useState('');
  const [activePost, setActivePost] = useState<PostInterface>();
  const [suggestedUsers, setSuggestedUsers] = useState<
    SuggestedUserInterface[]
  >();
  const [loggedInUserSavedPosts, setLoggedInUserSavedPosts] = useState<
    PostInterface[]
  >();
  const payloadUser = useAuth();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetchWithAuth(`http://localhost:3001/posts/relevant`, retrieveToken(), {
      method: 'GET',
    }).then(async (postsResp) => {
      const postsReturned = await postsResp.json();
      setRelevantPosts(postsReturned);
    });

    fetchWithAuth(`http://localhost:3001/auth/users`, retrieveToken(), {
      method: 'GET',
    }).then(async (usersResp) => {
      const users = await usersResp.json();
      setUsers(users);
    });

    fetchWithAuth(
      `http://localhost:3001/auth/users/suggested`,
      retrieveToken(),
    ).then(async (suggestedUsersResp) => {
      setSuggestedUsers(await suggestedUsersResp.json());
    });
  }, []);

  const followUser = (userId: string) => {
    fetchWithAuth(`http://localhost:3001/follow/${userId}`, retrieveToken(), {
      method: 'POST',
    });
  };
  const PostComment = (commentContents: string, postId: number) => {
    fetchWithAuth(
      `http://localhost:3001/posts/${postId}/comment`,
      retrieveToken(),
      {
        method: 'POST',
        body: JSON.stringify({ contents: commentContents }),
      },
    );
  };
  const LikePost = useCallback((postId: number) => {
    fetchWithAuth(
      `http://localhost:3001/posts/${postId}/like`,
      retrieveToken(),
      { method: 'PATCH' },
    );
  }, []);

  const SavePost = useCallback((postId: number) => {
    fetchWithAuth(
      `http://localhost:3001/posts/${postId}/save`,
      retrieveToken(),
      { method: 'POST' },
    );
  }, []);

  const UnsavePost = useCallback((postId: number) => {
    fetchWithAuth(
      `http://localhost:3001/posts/${postId}/unsave`,
      retrieveToken(),
      { method: 'DELETE' },
    );
  }, []);

  const UnlikePost = useCallback((postId: number) => {
    fetchWithAuth(
      `http://localhost:3001/posts/${postId}/unlike`,
      retrieveToken(),
      { method: 'PATCH' },
    );
  }, []);

  useEffect(() => {
    fetchWithAuth(`http://localhost:3001/posts`, retrieveToken(), {
      method: 'GET',
    }).then(async (allpostsResp) => {
      setPosts(await allpostsResp.json());
    });
  }, []);

  useEffect(() => {
    if (payloadUser) {
      fetchWithAuth(
        `http://localhost:3001/auth/user/${payloadUser?.username}`,
        retrieveToken(),
      ).then(async (userResp) => {
        setUser(await userResp.json());
      });
    }
  }, [payloadUser]);

  useEffect(() => {
    fetchWithAuth(`http://localhost:3001/auth/savedPosts`, retrieveToken(), {
      method: 'GET',
    }).then(async (savedPostsResp) => {
      setLoggedInUserSavedPosts(await savedPostsResp.json());
    });
  }, []);

  return (
    <Router>
      <Navbar followUser={followUser} />

      <Route exact path="/">
        <SignIn />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>


      <Switch>
        <Route exact path="/home">
          <Home
            posts={posts}
            users={users}
            followUser={followUser}
            suggestedUsers={suggestedUsers}
            PostComment={PostComment}
            LikePost={LikePost}
            SavePost={SavePost}
            comment={comment}
            setComment={setComment}
            UnlikePost={UnlikePost}
            UnsavePost={UnsavePost}
          />
        </Route>
        <Route path="/p/:postId">
          <PostFullView
            PostComment={PostComment}
            LikePost={LikePost}
            SavePost={SavePost}
            followUser={followUser}
            onClose={() => null}
            comment={comment}
            setComment={setComment}
            setActivePost={setActivePost}
            popup={false}

          />
        </Route>
        <Route path="/explore/people/suggested">
          <SuggestedPeople
            users={users}
            suggestedUsers={suggestedUsers}
            followUser={followUser}
          />
        </Route>

        <Route path="/discover">
          <Discover
            suggestedUsers={suggestedUsers}
            followUser={followUser}
            posts={posts}
            PostComment={PostComment}
            LikePost={LikePost}
            SavePost={SavePost}
            comment={comment}
            setComment={setComment}

          />
        </Route>

        <Route path="/createpost">
          <CreatePost />
        </Route>

        <Route path="/direct">
          <Message />
        </Route>
        {user && (
          <Route path={`/profile/:username`} component={Profile}>
            <Profile
              followUser={followUser}
              PostComment={PostComment}
              LikePost={LikePost}
              SavePost={SavePost}
              comment={comment}
              setComment={setComment}
            />
          </Route>
        )}
        <Route path="/account" component={AccountSettings}>
          <AccountSettings />
        </Route>
      </Switch>
    </Router>
  );
};
export default App;
