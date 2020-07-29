import React, { SetStateAction } from 'react';
import './Comment.scss';
import LikeIcon from './icons/like.icon';
import { fetchWithAuth, retrieveToken } from '../helpers/auth';
import { User } from '../interfaces/user';
import { GetPhoto, GetProfileImage } from '../helpers/getimage';
import { Reply } from '../interfaces/reply';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import cn from 'classnames';
import { PostInterface } from '../interfaces/post';
import { log } from 'util';
import { CommentInterface } from '../interfaces/comment';
import { useLoggedInUser } from '../contexts/UserContext';
interface CommentProps {
  contents: string;
  username: string;
  id: number;
  // postId: number;
  userimgfilename?: string;
  // timeposted: Date;
  likes?: User[];
  replies?: Reply[];
  isReply: boolean;
  fullReply: boolean;
}
const Comment: React.FC<CommentProps> = ({
  contents,
  username,
  id,
  userimgfilename,
  likes,
  replies,
  isReply,
  fullReply,
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const [comment, setComment] = useState<CommentInterface>();
  const { loggedInUser, setLoggedInUser } = useLoggedInUser();

  const LikeComment = () => {
    fetchWithAuth(
      `http://localhost:3001/posts/comments/${id}/like`,
      retrieveToken(),
      { method: 'POST' },
    );
  };

  const UnlikeComment = () => {
    fetchWithAuth(
      `http://localhost:3001/posts/comments/${id}/unlike`,
      retrieveToken(),
      { method: 'POST' },
    );
  };

  useEffect(() => {
    fetchWithAuth(
      `http://localhost:3001/posts/comments/${id}`,
      retrieveToken(),
      {
        method: 'GET',
      },
    ).then(async (postResp) => {
      setComment(await postResp.json());
    });
  }, [id]);

  return (
    <div className={cn('comment', { reply: isReply })}>
      <div className="comment_contents">
        {userimgfilename && (
          <Link to={`/profile/${username}`} className="userimg--link">
            <img
              src={userimgfilename}
              alt={username}
              className="contents_userimg"
            />
          </Link>
        )}
        <Link to={`/profile/${username}`} className="contents_username">
          <p className="contents">
            <span className="contents_username">{username}</span>
            <p className="contents_content">{contents}</p>
          </p>
        </Link>
        <button
          className="contents_like"
          onClick={() => {
            if (loggedInUser && comment && comment.likes) {
              if (
                loggedInUser.likedComments.find(
                  (likedcomment) => likedcomment.id === id,
                )
              ) {
                UnlikeComment();
                setLoggedInUser({
                  ...loggedInUser,
                  likedComments: [
                    ...loggedInUser.likedComments.filter(
                      (likedcomment) => likedcomment.id !== id,
                    ),
                  ],
                });
              } else {
                LikeComment();
                setLoggedInUser({
                  ...loggedInUser,
                  likedComments: [
                    ...loggedInUser.likedComments,
                    { id: id, contents: contents, user: comment.user },
                  ],
                });
              }
            }
          }}
        >
          <LikeIcon
            height={12}
            width={12}
            color={
              loggedInUser?.likedComments.find(
                (likedComment) => likedComment.id === id,
              )
                ? 'ED4956'
                : undefined
            }
          ></LikeIcon>
        </button>
      </div>

      {fullReply && (
        <div className="comment_actions-and-info">
          <p className="actions-and-info_timeposted">2d</p>
          {likes && likes?.length >= 1 && (
            <p className="actions-and-info_likes">
              {likes.length === 1
                ? `${likes.length} like `
                : `${likes.length} likes`}
            </p>
          )}

          <button className="actions-and-info_reply">Reply</button>
        </div>
      )}

      {replies && replies.length >= 1 && (
        <button
          className="comment_view-replies"
          onClick={() => setShowReplies(!showReplies)}
        >
          <hr className="replies_line"></hr>
          {showReplies ? `Hide replies ` : ` View replies (${replies.length})`}
        </button>
      )}
      {showReplies &&
        replies &&
        replies.length >= 1 &&
        replies.map((reply) => (
          <Comment
            contents={reply.contents}
            username={reply.user.username}
            userimgfilename={GetProfileImage(reply.user)}
            id={reply.id}
            isReply={true}
            fullReply={true}
          />
        ))}
    </div>
  );
};

export default Comment;
