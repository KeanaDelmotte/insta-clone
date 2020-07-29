import React from 'react';
import { ReplyInterface } from "../interfaces/reply"
import { GetProfileImage } from '../helpers/getimage';
import { Link } from 'react-router-dom';
import LikeButton from '../buttons/LikeButton';
interface ReplyProps {
  reply: ReplyInterface;
  fullReply: boolean;

}

const Reply: React.FC<ReplyProps> = ({ reply, fullReply }) => {
  return (
    <div className='comment reply'>
      <div className="comment_contents">
        {reply?.user.profilePhoto.filename && (
          <Link to={`/profile/${reply?.user.username}`} className="userimg--link">
            <img
              src={GetProfileImage(reply.user)}
              alt={reply?.user.username}
              className="contents_userimg"
            />
          </Link>
        )}
        <Link to={`/profile/${reply?.user.username}`} className="contents_username">
          <p className="contents">
            <span className="contents_username">{reply?.user.username}</span>
            <p className="contents_content">{reply?.contents}</p>
          </p>
        </Link>
        <LikeButton reply={reply}></LikeButton>
      </div>

      {fullReply && (
        <div className="comment_actions-and-info">
          <p className="actions-and-info_timeposted">2d</p>
          {reply?.likes && reply.likes.length >= 1 && (
            <p className="actions-and-info_likes">
              {reply.likes.length === 1
                ? `${reply.likes.length} like `
                : `${reply.likes.length} likes`}
            </p>
          )}

          <button className="actions-and-info_reply">Reply</button>
        </div>
      )}
      {/* 
      {reply?.replies && comment.replies.length >= 1 && (
        <button
          className="comment_view-replies"
          onClick={() => setShowReplies(!showReplies)}
        >
          <hr className="replies_line"></hr>
          {showReplies ? `Hide replies ` : ` View replies (${comment.replies.length})`}
        </button>
      )} */}
      {/* {showReplies &&
        comment?.replies &&
        comment.replies.length >= 1 &&
        comment.replies.map((reply) => (
          <Comment
            id={reply.id}
            isReply={true}
            fullReply={true}
          />
        ))} */}
    </div>
  )
}
export default Reply;