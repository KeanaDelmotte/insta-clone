import React, { useCallback } from 'react';
import SaveIcon from '../icons/save.icon';
import { PostInterface } from '../interfaces/post';
import { fetchWithAuth, retrieveToken } from '../helpers/auth';
import { useLoggedInUser } from '../contexts/UserContext';
import { useSavedPosts } from '../contexts/SavedPostsContext';

interface SavePostButtonProps {
  post: PostInterface | undefined;
}
const SavePostButton: React.FC<SavePostButtonProps> = ({ post }) => {
  const { loggedInUser } = useLoggedInUser();
  const { savedPosts, setSavedPosts } = useSavedPosts();

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

  return (
    <button
      className="actions_save"
      onClick={() => {
        if (savedPosts?.find((p) => p.id === post?.id) && post) {
          UnsavePost(post?.id);

          if (loggedInUser) {
            setSavedPosts([
              ...savedPosts.filter((savedPost) => savedPost.id !== post?.id),
            ]);
          }
        } else if (post) {
          SavePost(post?.id);
          if (loggedInUser) {
            if (savedPosts && post) {
              setSavedPosts([...savedPosts, post]);
            }
          }
        }
      }}
    >
      <SaveIcon
        height={24}
        width={24}
        color={
          savedPosts?.find((p) => p.id === post?.id) ? '#262626' : undefined
        }
      ></SaveIcon>
    </button>
  );
};

export default SavePostButton;
