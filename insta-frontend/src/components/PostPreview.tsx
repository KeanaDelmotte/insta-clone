import React, { SetStateAction } from 'react';
import { PostInterface } from '../interfaces/post';
import { GetPhoto } from '../helpers/getimage';
import { BsFillChatFill } from 'react-icons/bs';
import LikeIcon from '../icons/like.icon';
import './PostPreview.scss';
import { useEffect } from 'react';
import { fetchWithAuth } from '../helpers/auth';
interface PostPreviewProps {
  post: PostInterface;
  setActivePost?: React.Dispatch<SetStateAction<PostInterface | undefined>>;
  setPopup?: React.Dispatch<SetStateAction<boolean>>;
}

const PostPreview: React.FC<PostPreviewProps> = ({
  post,
  setActivePost,
  setPopup,
}) => {
  return (
    <div className="post-preview">
      <button
        className="explore_post-preview"
        key={post.id}
        onClick={() => {
          setActivePost && setActivePost(post);
          setPopup && setPopup(true);
        }}
      >
        <img
          src={GetPhoto(post.photos[0].filename)}
          alt={post.description}
          className="post-preview_content"
        />
        <div className="post-preview_actions">
          <button className="actions_like">
            <LikeIcon
              height={20}
              width={20}
              color={'#fff'}
              fillcolor={'#fff'}
            />
            <span className="like_amount">{post.likes.length}</span>
          </button>
          <button className="actions_comment">
            <BsFillChatFill className="comment-icon" size="20" />
            <span className="comment_amount">{post.comments.length}</span>
          </button>
        </div>
      </button>
    </div>
  );
};

export default PostPreview;
