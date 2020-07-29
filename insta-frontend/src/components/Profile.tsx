import React from 'react';
import { useEffect, useState } from 'react';
import { fetchWithAuth, retrieveToken } from '../helpers/auth';
import { User } from '../interfaces/user';
import './Profile.scss';
import { PostInterface } from '../interfaces/post';
import SettingsIcon from '../icons/settings.icon';
import { GetProfileImage } from '../helpers/getimage';
import { useParams } from 'react-router';
import PostsGridIcon from '../icons/posts-grid.icon';
import IgtvIcon from '../icons/igtv.icon';
import SaveIcon from '../icons/save.icon';
import TaggedIcon from '../icons/tagged.icon';
import cn from 'classnames';
import PostPreview from './PostPreview';
import PostFullView from './PostFullView';
import HamburgerMenuIcon from '../icons/hamburger.icon';
import { FiCamera } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useSavedPosts } from '../contexts/SavedPostsContext';
import { useLoggedInUser } from '../contexts/UserContext';

interface ProfileProps {
  followUser: (userId: string) => void;
  PostComment: (commentContent: string, postId: number) => void;
  LikePost: (postId: number) => void;
  SavePost: (postId: number) => void;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
}

const Profile: React.FC<ProfileProps> = ({
  followUser,
  PostComment,
  LikePost,
  SavePost,
  comment,
  setComment,

}) => {
  const { username } = useParams();
  const { loggedInUser: signedInUser } = useLoggedInUser()
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<PostInterface[] | undefined>();
  const [postsSelected, setPostsSelected] = useState(true);
  const [igtvSelected, setIgtvSelected] = useState(false);
  const [savedSelected, setSavedSelected] = useState(false);
  const [taggedSelected, setTaggedSelected] = useState(false);
  const [activePost, setActivePost] = useState<PostInterface>();
  const [postPopup, setPostPopup] = useState(false);

  useEffect(() => {
    fetchWithAuth(
      `http://localhost:3001/auth/user/${username}`,
      retrieveToken(),
      {
        method: 'GET',
      },
    ).then(async (returnedUser) => {
      setUser(await returnedUser.json());
    });

  }, [username]);

  useEffect(() => {
    if (user) {
      fetchWithAuth(
        `http://localhost:3001/posts/user/${user?.id}/posts`,
        retrieveToken(),
        { method: 'GET' },
      ).then(async (returnedPosts) => {
        setPosts(await returnedPosts.json());
      });


    }
  }, [user]);

  const userIsSignedInUser = signedInUser?.username === username;
  const { savedPosts } = useSavedPosts()

  return (
    <div className="page_profile">
      <div className="profile">
        <img
          src={GetProfileImage(user)}
          alt={user?.username}
          className="profile_photo"
        />
        <div className="user_actions">
          <p className="username">{user?.username}</p>
          {userIsSignedInUser && (
            <>
              <Link to="/account/edit">
                <button className="edit-profile">Edit Profile</button>
              </Link>
              <button className="settings">
                <SettingsIcon height={22} width={22} />
              </button>
            </>
          )}
          {!userIsSignedInUser && (
            <>
              <button className="message">message</button>
              <button className="user_follow">Follow</button>
              <button className="see_suggested">See</button>
              <button className="hamburger">
                <HamburgerMenuIcon />
              </button>
            </>
          )}
        </div>

        <div className="user_info">
          <p className="info_posts">
            {user?.posts.length === 1
              ? `${user?.posts.length} post`
              : `${user?.posts.length} posts`}
          </p>
          <p className="info_followers">
            {user?.followers.length === 1
              ? `${user?.followers.length} follower`
              : `${user?.followers.length} followers`}
          </p>
          <p className="info_following">{`${user?.following.length} following`}</p>
        </div>
        {user?.name && <p className="profile_name">{user.name}</p>}
      </div>
      <div className="profile_navigation">
        <button
          className={cn('navigation_posts', {
            'profile_navigation--selected': postsSelected,
          })}
          onClick={() => {
            setPostsSelected(true);
            setIgtvSelected(false);
            setSavedSelected(false);
            setTaggedSelected(false);
          }}
        >
          <PostsGridIcon height={12} width={12} />
          POSTS
        </button>
        {userIsSignedInUser && (
          <button
            className={cn('navigation_igtv', {
              'profile_navigation--selected': igtvSelected,
            })}
            onClick={() => {
              setPostsSelected(false);
              setIgtvSelected(true);
              setSavedSelected(false);
              setTaggedSelected(false);
            }}
          >
            <IgtvIcon height={12} width={12} />
            IGTV
          </button>
        )}

        {userIsSignedInUser && (
          <button
            className={cn('navigation_saved', {
              'profile_navigation--selected': savedSelected,
            })}
            onClick={() => {
              setPostsSelected(false);
              setIgtvSelected(false);
              setSavedSelected(true);
              setTaggedSelected(false);
            }}
          >
            <SaveIcon height={12} width={12} />
            SAVED
          </button>
        )}

        <button
          className={cn('navigation_tagged', {
            'profile_navigation--selected': taggedSelected,
          })}
          onClick={() => {
            setPostsSelected(false);
            setIgtvSelected(false);
            setSavedSelected(false);
            setTaggedSelected(true);
          }}
        >
          <TaggedIcon height={12} width={12} />
          TAGGED
        </button>
      </div>
      {postsSelected && posts && posts?.length >= 1 && (
        <div className="user-profile_posts">
          {posts &&
            posts?.map((post) => {
              console.log(post);
              return (
                <PostPreview
                  post={post}
                  setActivePost={setActivePost}
                  setPopup={setPostPopup}
                />
              );
            })}
        </div>
      )}
      {postsSelected && posts && posts.length < 1 && userIsSignedInUser && (
        <div className="no-posts">
          <img
            src={'/img/instagram-no-posts.jpg'}
            alt={'posts_example'}
            className="no-posts_image"
          />
          <div className="no-posts_info">
            <p className="start-capturing">
              Start capturing and sharing your moments
            </p>
            <p className="get-app--text">
              Get the app to share your first photo or video
            </p>
            <div className="get-app">
              <a
                href={'https://apps.apple.com/app/instagram/id389801252?vt=li'}
                className="get-app_appstore"
              >
                <img
                  src="/img/get-on-appstore.png"
                  alt={'get on appstore'}
                  className="appstore_img"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DprofilePage%26ig_mid%3DB17001D5-10A2-4EE6-9BE8-4D92D2CCB84E%26utm_content%3Dli%26utm_medium%3Dbadge"
                className="get-app_googleplay"
              >
                <img
                  src="/img/get-on-googleplay.png"
                  alt="get on google play"
                  className="googleplay_img"
                />
              </a>
            </div>
          </div>
        </div>
      )}
      {postsSelected && posts && posts.length < 1 && !userIsSignedInUser && (
        <div className="profile-posts">
          <div className="profile-posts_icon">
            <FiCamera size={30} />
          </div>
          <p className="profile-posts_info">No Posts Yet</p>
        </div>
      )}
      {igtvSelected && (
        <div className="igtv">
          <div className="igtv_icon">
            <IgtvIcon height={30} width={30} />
          </div>
          <p className="igtv_upload-a-video">Upload a Video</p>
          <p className="igtv_info">
            Videos must be between 1 and 60 minutes long.
          </p>
          <button className="igtv_upload">Upload</button>
        </div>
      )}

      {userIsSignedInUser &&
        savedSelected &&
        savedPosts &&
        savedPosts?.length < 1 && (
          <div className="saved">
            <div className="saved_icon">
              <SaveIcon height={30} width={30} />
            </div>
            <p className="saved_save">Save</p>
            <p className="saved_info">
              Save photos and videos that you want to see again. No one is
              notified, and only you can see what you've saved.
            </p>
          </div>
        )}
      {userIsSignedInUser &&
        savedSelected &&
        savedPosts &&
        savedPosts.length >= 1 && (
          <div className="saved-posts">
            <p className="saved-posts_disclaimer">
              Only you can see what you've saved
            </p>
            <div className="saved-posts_posts">
              {savedPosts &&
                savedPosts.map((savedPost) => (
                  <PostPreview
                    post={savedPost}
                    setActivePost={setActivePost}
                    setPopup={setPostPopup}
                  />
                ))}
            </div>
          </div>
        )}
      {taggedSelected && user && user.taggedIn.length < 1 && (
        <div className="tagged-in">
          <div className="tagged-in_icon">
            <TaggedIcon height={30} width={30} />
          </div>
          {userIsSignedInUser && (
            <>
              <p className="tagged-in_photos-of-you">Photos of you</p>
              <p className="tagged-in_info">
                When people tag you in posts, they'll appear here.
              </p>
            </>
          )}
          {!userIsSignedInUser && (
            <p className="tagged-in_photos-of-you">No Photos</p>
          )}
        </div>
      )}
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

export default Profile;
