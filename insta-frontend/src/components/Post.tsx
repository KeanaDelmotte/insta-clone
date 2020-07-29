import React from 'react';
import './Post.scss';
import CommentIcon from '../icons/comment.icon';
import ShareIcon from '../icons/share.icon';
import Comment from './Comment';
import { GetProfileImage, GetPhoto } from '../helpers/getimage';
import HamburgerMenuIcon from '../icons/hamburger.icon';
import { GetTimeSinceDate } from '../helpers/formatTimeFromDate';
import { fetchWithAuth, retrieveToken } from '../helpers/auth';
import { PostInterface } from '../interfaces/post';
import { useState, useEffect } from 'react';
import ExpandableText from './Expandabletext';
import { Link } from 'react-router-dom';
import { CommentInterface } from '../interfaces/comment';
import SavePostButton from '../buttons/SavePostButton';
import { useLoggedInUser } from '../contexts/UserContext';
import LikeButton from '../buttons/LikeButton';
import SlideShow from './Slider';
import Skeleton from "react-loading-skeleton";
interface PostProps {
  PostComment: (commentContent: string, postId: number) => void;
  LikePost: (postId: number) => void;
  UnlikePost: (postId: number) => void;
  SavePost: (postId: number) => void;
  UnsavePost: (postId: number) => void;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  post: PostInterface
}

const Post: React.FC<PostProps> = ({

  PostComment,
  LikePost,
  SavePost,
  comment,
  setComment,
  post

}) => {
  const [postComments, setPostComments] = useState<CommentInterface[]>()



  useEffect(() => {
    fetchWithAuth(`http://localhost:3001/posts/${post.id}/comments`, retrieveToken(), { method: 'GET' }).then(async commentsResp => {
      setPostComments(await commentsResp.json())
    })
  }, [post])

  return (<>
    <div className="post">
      <div className="post_header">
        <img
          src={GetProfileImage(post.user)}
          alt={post.user.username}
          className="header_profilepicture"
        />
        <h2 className="header_username">{post.user.username}</h2>
        <HamburgerMenuIcon className="header_hamburger" />
      </div>

      <SlideShow post={post} />

      <div className="post_info">
        <div className="post_actions">
          <LikeButton post={post} />
          <button className="actions_comment">
            {<CommentIcon height={24} width={24} />}
          </button>
          <button className="actions_share">
            {<ShareIcon height={24} width={24} />}
          </button>

          <SavePostButton post={post} />
        </div>
        <p className="post_likes">
          {post?.likes.length === 1
            ? `${post?.likes.length} like`
            : `${post?.likes.length} likes`}
        </p>
        <div className="post_description">
          <p className="description_user--name">{post.user.username}</p>
          <ExpandableText content={post.description} limit={150} />
        </div>

        {post.comments.length >= 1 && (
          <Link to={`/p/${post.id}`}>
            <button className="post_view-comments">
              {`View all ${post.comments.length} comments`}
            </button>
          </Link>
        )}

        {postComments?.map((comment: CommentInterface) => (
          <Comment
            comment={comment}
            fullReply={false}
            key={comment.id}
          />
        ))}
        <p className="post_timecreated">
          {GetTimeSinceDate(new Date(post.timeCreated), 'long')}
        </p>
      </div>
      <hr className="comment_seperation" />

      <div className="post_comment">
        <input
          type="text"
          className="comment_input"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          placeholder="Add a comment..."
        />
        <button
          className="comment_submit"
          type="submit"
          onClick={() => {
            PostComment(comment, post.id);

          }}
        >
          Post
        </button>
      </div>
    </div >

  </>
  );

};

export default Post;
