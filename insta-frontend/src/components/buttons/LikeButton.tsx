import React, { useCallback } from 'react';
import { PostInterface } from '../../interfaces/post';
import { useLoggedInUser } from '../../contexts/UserContext';
import { fetchWithAuth, retrieveToken } from '../../helpers/auth';
import LikeIcon from '../icons/like.icon';

interface LikeButtonProps {
  post: PostInterface | undefined;
}

const LikeButton: React.FC<LikeButtonProps> = ({ post }) => {
  const { loggedInUser, setLoggedInUser } = useLoggedInUser();
  const LikePost = useCallback((postId: number) => {
    fetchWithAuth(
      `http://localhost:3001/posts/${postId}/like`,
      retrieveToken(),
      { method: 'PATCH' },
    );
  }, []);
  const UnlikePost = useCallback((postId: number) => {
    fetchWithAuth(
      `http://localhost:3001/posts/${postId}/unlike`,
      retrieveToken(),
      { method: 'PATCH' },
    );
  }, []);
  return (
    <button
      className="actions_like"
      onClick={() => {
        if (loggedInUser?.likedPosts.find((p) => p.id === post?.id) && post) {
          UnlikePost(post?.id);
          if (loggedInUser && loggedInUser.likedPosts) {
            setLoggedInUser({
              ...loggedInUser,
              likedPosts: [
                ...loggedInUser.likedPosts.filter(
                  (likedpost) => likedpost.id !== post?.id,
                ),
              ],
            });
          }
        } else {
          if (post) LikePost(post?.id);
          if (loggedInUser && loggedInUser.likedPosts && post) {
            setLoggedInUser({
              ...loggedInUser,
              likedPosts: [
                ...loggedInUser.likedPosts,
                {
                  timeCreated: post?.timeCreated,
                  id: post?.id,
                  description: post?.description,
                  photos: [
                    {
                      url: post?.photos[0].url,
                      filename: post?.photos[0].filename,
                      id: post?.photos[0].id,
                    },
                  ],
                },
              ],
            });
          }
        }
      }}
    >
      <LikeIcon
        height={24}
        width={24}
        color={
          loggedInUser?.likedPosts.find((p) => p.id === post?.id)
            ? '#ED4956'
            : undefined
        }
      />
    </button>
  );
};

export default LikeButton;
