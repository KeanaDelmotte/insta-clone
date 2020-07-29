import React from 'react';
import './Comment.scss';
import { fetchWithAuth, retrieveToken } from '../helpers/auth';
import { GetProfileImage } from '../helpers/getimage';
import { ReplyInterface } from '../interfaces/reply';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import cn from 'classnames';
import { CommentInterface } from '../interfaces/comment';
import LikeButton from '../buttons/LikeButton';
import Reply from './Reply';
interface CommentProps {
  comment: CommentInterface;
  fullReply: boolean;

}
const Comment: React.FC<CommentProps> = ({
  comment,
  fullReply

}) => {
  const [showReplies, setShowReplies] = useState(false);
  const [commentReplies, setCommentReplies] = useState<ReplyInterface[]>()

  const LikeComment = () => {
    fetchWithAuth(
      `http://localhost:3001/posts/comments/${comment.id}/like`,
      retrieveToken(),
      { method: 'POST' },
    );
  };

  const UnlikeComment = () => {
    fetchWithAuth(
      `http://localhost:3001/posts/comments/${comment.id}/unlike`,
      retrieveToken(),
      { method: 'POST' },
    );
  };

  useEffect(() => {
    fetchWithAuth(`http://localhost:3001/posts/comments/${comment.id}/replies`, retrieveToken(), { method: "GET" }).then(async repliesResp => {
      setCommentReplies(await repliesResp.json())
    })
  }, [comment])


  return (
    <div className={cn('comment')}>
      <div className="comment_contents">
        {comment?.user.profilePhoto.filename && (
          <Link to={`/profile/${comment?.user.username}`} className="userimg--link">
            <img
              src={GetProfileImage(comment.user)}
              alt={comment?.user.username}
              className="contents_userimg"
            />
          </Link>
        )}
        <Link to={`/profile/${comment?.user.username}`} className="contents_username">
          <p className="contents">
            <span className="contents_username">{comment?.user.username}</span>
            <p className="contents_content">{comment?.contents}</p>
          </p>
        </Link>

        <LikeButton comment={comment}></LikeButton>

      </div>

      {fullReply && comment?.replies && comment.replies.length >= 1 && (
        <button
          className="comment_view-replies"
          onClick={() => setShowReplies(!showReplies)}
        >
          <hr className="replies_line"></hr>
          {showReplies ? `Hide replies ` : ` View replies (${comment.replies.length})`}
        </button>
      )}
      {showReplies &&
        commentReplies &&
        commentReplies.length >= 1 &&
        commentReplies.map((reply) => (
          <Reply
            reply={reply}
            fullReply={true}
          />
        ))}
    </div>
  );
};

export default Comment;
