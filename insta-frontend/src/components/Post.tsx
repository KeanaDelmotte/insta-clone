import React from 'react';
import './Post.scss';
import LikeIcon from './icons/like.icon';
import CommentIcon from './icons/comment.icon';
import ShareIcon from './icons/share.icon';
import Comment from './Comment';
import { User } from '../interfaces/user';
import { GetProfileImage } from '../helpers/getimage';
import HamburgerMenuIcon from './icons/hamburger.icon';
import SaveIcon from './icons/save.icon';
import { GetTimeSinceDate } from '../helpers/formatTimeFromDate';
import { fetchWithAuth, retrieveToken } from '../helpers/auth';
import { PostInterface } from '../interfaces/post';
import { useState, useEffect } from 'react';
import ExpandableText from './Expandabletext';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useHistory } from 'react-router';
import { url } from 'inspector';
import { PostLike } from '../interfaces/postLike';
import { stringify } from 'querystring';
import { CommentInterface } from '../interfaces/comment';
import SavePostButton from './buttons/SavePostButton';
import { useLoggedInUser } from '../contexts/UserContext';
import { useSavedPosts } from '../contexts/SavedPostsContext';
import LikeButton from './buttons/LikeButton';
interface PostProps {
  description: string;
  filename: string;
  likes: PostLike[];
  comments: CommentInterface[];
  user: User;
  timeCreated: string;
  postId: number;
  photoId: number;
  photourl: string;
  PostComment: (commentContent: string, postId: number) => void;
  LikePost: (postId: number) => void;
  UnlikePost: (postId: number) => void;
  SavePost: (postId: number) => void;
  UnsavePost: (postId: number) => void;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
}

const Post: React.FC<PostProps> = ({
  filename,
  likes,
  comments,
  description,
  user,
  timeCreated,
  postId,
  PostComment,
  LikePost,
  SavePost,
  comment,
  setComment,
  UnlikePost,
  UnsavePost,
  photoId,
  photourl,
}) => {
  const [post, setPost] = useState<PostInterface>();
  const { loggedInUser } = useLoggedInUser();

  useEffect(() => {
    fetchWithAuth(`http://localhost:3001/posts/${postId}`, retrieveToken(), {
      method: 'GET',
    }).then(async (postResp) => {
      setPost(await postResp.json());
    });
  }, [postId]);

  return (
    <div className="post">
      <div className="post_header">
        <img
          src={GetProfileImage(user)}
          alt={user.username}
          className="header_profilepicture"
        />
        <h2 className="header_username">{user.username}</h2>
        <HamburgerMenuIcon className="header_hamburger" />
      </div>

      <img
        src={`http://localhost:3001/public/${filename}`}
        alt={description}
        className="post_photo"
      />
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
          <p className="description_user--name">{user.username}</p>
          {/* <p className="description_text">{description}</p> */}
          <ExpandableText content={description} limit={150} />
        </div>

        {comments.length >= 1 && (
          <Link to={`/p/${postId}`}>
            <button className="post_view-comments">
              {`View all ${comments.length} comments`}
            </button>
          </Link>
        )}

        {post?.comments.map((comment: CommentInterface) => (
          <Comment
            contents={comment.contents}
            username={comment.user.username}
            id={comment.id}
            isReply={false}
            fullReply={false}
          />
        ))}
        <p className="post_timecreated">
          {GetTimeSinceDate(new Date(timeCreated), 'long')}
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
            PostComment(comment, postId);
            // if (post && post.comments && loggedInUser)
            //   setPost({
            //     ...post,
            //     comments: [
            //       ...post?.comments,
            //       {
            //         user: loggedInUser,
            //         contents: comment,
            //         replies: [],
            //         likes: [],
            //         post: post,
            //       },
            //     ],
            //   });
          }}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Post;
