import React, { useRef, SetStateAction } from 'react';
import { User } from '../interfaces/user';
import { GetProfileImage, GetPhoto } from '../helpers/getimage';
import './Discover.scss';
import { SuggestedUserInterface } from '../interfaces/suggestedUser';

import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import { PostInterface } from '../interfaces/post';

import PostFullView from './PostFullView';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PostPreview from './PostPreview';
import cn from 'classnames';
import FollowButton from '../buttons/FollowBtn';
import { useLoggedInUser } from '../contexts/UserContext';
interface DiscoverProps {
  suggestedUsers: SuggestedUserInterface[] | undefined;
  followUser: (userId: string) => void;
  posts: PostInterface[];
  PostComment: (commentContent: string, postId: number) => void;
  LikePost: (postId: number) => void;
  SavePost: (postId: number) => void;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;

}

const Discover: React.FC<DiscoverProps> = ({
  suggestedUsers,
  followUser,
  posts,
  PostComment,
  LikePost,
  SavePost,
  comment,
  setComment,

}) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [activePost, setActivePost] = useState<PostInterface>();
  const [postPopup, setPostPopup] = useState(false);
  const { loggedInUser, setLoggedInUser } = useLoggedInUser()


  return (
    <div
      className={cn('discover', {
        discover_popupactive: postPopup && activePost,
      })}
    >
      <div className="discover_people">
        <div className="people_actions">
          <p className="actions_info">Discover People</p>
          <Link className="link-to" to="explore/people/suggested/">
            <button className="actions_see-all">See All</button>
          </Link>
        </div>{' '}
        <div className="suggested">
          {suggestedUsers && suggestedUsers?.length > 4 && (
            <button
              className="users_scrollback"
              onClick={() => {
                if (listRef.current) {
                  listRef.current.scrollBy({
                    top: 0,
                    left: -510,
                    behavior: 'smooth',
                  });
                }
              }}
            >
              <AiFillLeftCircle className="user_nav" size={27} />
            </button>
          )}
          <ul className="people_users" ref={listRef}>
            {suggestedUsers?.map((user: SuggestedUserInterface) => (
              <li className="users_user" key={user.user.id}>
                <Link
                  to={`/profile/${user.user.username}`}
                  className="link-to-profile"
                >
                  <img
                    src={GetProfileImage(user.user)}
                    alt={user.user.username}
                    className="user_profile-image"
                  />
                </Link>
                <Link
                  to={`/profile/${user.user.username}`}
                  className="link-to-profile"
                >
                  <p className="user_username">{user.user.username}</p>
                </Link>
                <p className="user_reason-for-suggestion">
                  {user.suggestion.reason}
                </p>
                <FollowButton user={user} btnfilled={true} />
              </li>
            ))}
          </ul>
          {suggestedUsers && suggestedUsers?.length > 4 && (
            <button
              className="users_scrollahead"
              onClick={() => {
                if (listRef.current) {
                  listRef.current.scrollBy({
                    top: 0,
                    left: 510,
                    behavior: 'smooth',
                  });
                }
              }}
            >
              <AiFillRightCircle className="user_nav" size={27} />
            </button>
          )}
        </div>
      </div>

      <div className="discover_explore">
        {posts.map((post) => (
          <PostPreview
            post={post}
            setActivePost={setActivePost}
            setPopup={setPostPopup}
          />
        ))}
      </div>
      {activePost && postPopup && (
        <PostFullView
          onClose={() => setPostPopup(false)}
          post={activePost}
          PostComment={PostComment}
          LikePost={LikePost}
          SavePost={SavePost}
          comment={comment}
          setComment={setComment}
          followUser={followUser}
          setActivePost={setActivePost}
          popup={true}

        />
      )}
    </div>
  );
};

export default Discover;
