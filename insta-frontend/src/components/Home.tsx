import React, { useRef } from 'react';
import { PostInterface } from '../interfaces/post';
import Post from './Post';
import { User } from '../interfaces/user';
import './Home.scss';
import SideFooter from './SideFooter';
import { SuggestedUserInterface } from '../interfaces/suggestedUser';

import SuggestedPeople from './SuggestedPeople';

interface HomeProps {
  users: User[];
  posts: PostInterface[];
  followUser: (userId: string) => void;
  user: User | undefined;
  suggestedUsers: SuggestedUserInterface[] | undefined;
  PostComment: (commentContent: string, postId: number) => void;
  LikePost: (postId: number) => void;
  UnlikePost: (postId: number) => void;
  SavePost: (postId: number) => void;
  UnsavePost: (postId: number) => void;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
}

const Home: React.FC<HomeProps> = ({
  users,
  posts,
  user,
  followUser,
  suggestedUsers,
  PostComment,
  LikePost,
  SavePost,
  comment,
  setComment,
  UnlikePost,
  UnsavePost,
}) => {
  const postsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="home">
      <div className="posts" ref={postsRef}>
        {posts.length >= 1 &&
          posts.map((post: PostInterface) => (
            <Post
              postId={post.id}
              timeCreated={post.timeCreated}
              photoId={post.photos[0].id}
              description={post.description}
              likes={post.likes}
              comments={post.comments}
              filename={post.photos[0].filename}
              user={post.user}
              PostComment={PostComment}
              LikePost={LikePost}
              SavePost={SavePost}
              comment={comment}
              setComment={setComment}
              UnlikePost={UnlikePost}
              UnsavePost={UnsavePost}
              key={post.id}
              photourl={post.photos[0].url}
            ></Post>
          ))}
      </div>

      {posts.length >= 1 && (
        <SideFooter
          suggestedUsers={suggestedUsers}
          className="side-footer"
          user={user}
          postsRef={postsRef}
          followUser={followUser}
        />
      )}
      {posts.length < 1 && (
        <SuggestedPeople
          users={users}
          suggestedUsers={suggestedUsers}
          followUser={followUser}
        />
      )}
    </div>
  );
};

export default Home;
