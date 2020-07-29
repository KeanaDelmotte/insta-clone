import React, { useRef, SetStateAction } from 'react';
import Comment from './Comment';
import { PostInterface } from '../interfaces/post';
import { GetProfileImage, GetPhoto } from '../helpers/getimage';
import HamburgerMenuIcon from '../icons/hamburger.icon';
import './PostFullView.scss';
import LikeIcon from '../icons/like.icon';
import CommentIcon from '../icons/comment.icon';
import ShareIcon from '../icons/share.icon';
import SaveIcon from '../icons/save.icon';
import { GetTimeSinceDate } from '../helpers/formatTimeFromDate';
import { useState, useEffect } from 'react';
import ExpandableText from './Expandabletext';
import cn from 'classnames';
import CloseIcon from '../icons/close.icon';
import { Link } from 'react-router-dom';
import { fetchWithAuth, retrieveToken } from '../helpers/auth';
import { useParams } from 'react-router';
import PostPreview from './PostPreview';
import { User } from '../interfaces/user';
import SavePostButton from '../buttons/SavePostButton';
import { useLoggedInUser } from '../contexts/UserContext';
import { useSavedPosts } from '../contexts/SavedPostsContext';
import { CommentInterface } from '../interfaces/comment';
import LikeButton from '../buttons/LikeButton';
import SlideShow from './Slider';
interface PostFullViewProps {
  popup: boolean;
  post?: PostInterface;
  PostComment: (commentContent: string, postId: number) => void;
  LikePost: (postId: number) => void;
  SavePost: (postId: number) => void;
  followUser: (userId: string) => void;
  onClose: () => void;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  setActivePost: React.Dispatch<
    React.SetStateAction<PostInterface | undefined>
  >;

}

const PostFullView: React.FC<PostFullViewProps> = ({
  popup,
  onClose: handleClose,
  post,
  PostComment,
  LikePost,
  SavePost,
  comment,
  setComment,
  followUser,
  setActivePost,

}) => {
  const { postId } = useParams();
  const fullPostPopup = useRef<HTMLDivElement>(null);
  const [fullPost, setFullPost] = useState<PostInterface>();
  const [postUserPosts, setPostUserPosts] = useState<PostInterface[]>();
  const [postPopup, setPostPopup] = useState(false);
  const { loggedInUser, setLoggedInUser } = useLoggedInUser()
  const { savedPosts, setSavedPosts } = useSavedPosts()
  const [postComments, setPostComments] = useState<CommentInterface[]>()


  useEffect(() => {
    if (post) {
      setFullPost(post);
    }
  }, [post]);
  useEffect(() => {
    if (!post) {
      fetchWithAuth(
        `http://localhost:3001/posts/${postId}`,
        retrieveToken(),
        {
          method: 'GET',
        },
      ).then(async (PostResp) => {
        const post = await PostResp.json();
        setFullPost(post);
      });
    }




  }, [post, postId]);

  useEffect(() => {
    fetchWithAuth(`http://localhost:3001/posts/${postId ? postId : post?.id}/comments`, retrieveToken(), { method: 'GET' }).then(async commentsResp => {
      setPostComments(await commentsResp.json())
    })
  }, [post])

  useEffect(() => {
    const closePopup = (event: MouseEvent) => {
      if (
        fullPostPopup.current &&
        !fullPostPopup.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };
    document.addEventListener('mousedown', closePopup);
    return () => {
      document.removeEventListener('mousedown', closePopup);
    };
  }, [handleClose]);



  useEffect(() => {
    fullPost &&
      fetchWithAuth(
        `http://localhost:3001/posts/user/${fullPost.user.id}/posts`,
        retrieveToken(),
        { method: 'GET' },
      ).then(async (userResp) => {
        setPostUserPosts(await userResp.json());
      });
  }, [fullPost]);


  return (
    <div className={cn('fullpost-page', { 'page-popup': popup })}>
      <div
        className={cn('full-post', { 'full-post--popup': popup })}
        ref={fullPostPopup}
      >
        {fullPost && (

          <SlideShow post={fullPost} className='full-post_media' />
        )}
        <div className="full-post_info">
          <div className="full-post_user">
            <Link to={`/profile/${fullPost?.user.username}`}>
              <img
                src={GetProfileImage(fullPost?.user)}
                alt={fullPost?.user.username}
                className="user_img"
              />
            </Link>
            <Link
              to={`/profile/${fullPost?.user.username}`}
              className="user_username"
            >
              <p className="user_username">
                {fullPost?.user.username}

                {fullPost?.user.name && (
                  <span className="username_name">{fullPost?.user.name}</span>
                )}
              </p>
            </Link>

            <p className="user_middot">&#183;</p>

            {fullPost && (
              <button
                className="user_follow--blue-text"
                onClick={() => {
                  followUser(fullPost?.user.id);
                }}
              >
                Follow
              </button>
            )}

            <button className="full-post_hamburger">
              <HamburgerMenuIcon />
            </button>
          </div>
          <hr className="full-post_line--header" />
          <div className="full-post_comment-section">
            <div className="comment-section_description">
              <Link to={`/profile/${fullPost?.user.username}`}>
                {fullPost && (
                  <img
                    src={GetPhoto(fullPost?.user.profilePhoto.filename)}
                    alt={fullPost?.user.username}
                    className="description_userimg"
                  />
                )}
              </Link>
              <p className="description_text">
                <Link
                  to={`/profile/${fullPost?.user.username}`}
                  className="text_user--name"
                >
                  <span className="text_user--name">
                    {fullPost?.user.username}
                  </span>
                </Link>
                {fullPost && (
                  <ExpandableText content={fullPost?.description} limit={150} />
                )}
                <span className="text_timecreated"></span>
              </p>
            </div>
            <div className="comment-section_comments">
              {postComments?.map((comment: CommentInterface) => (
                <Comment
                  comment={comment}
                  fullReply={true}
                />
              ))}
            </div>
          </div>
          <hr className="full-post_line--comment-section" />{' '}
          <div className="full-post_actions-and-info">
            <div className="actions-and-info_actions">
              {fullPost && (
                <LikeButton post={fullPost} />
              )}
              <button className="actions_comment">
                {<CommentIcon height={24} width={24} />}
              </button>
              <button className="actions_share">
                {<ShareIcon height={24} width={24} />}
              </button>
              {fullPost && <SavePostButton post={post} />}
            </div>
            <div className="actions-and-info_info">
              <p className="info_likes">{`${fullPost?.likes.length} likes`}</p>
              {fullPost && (
                <p className="info_timecreated">
                  {GetTimeSinceDate(new Date(fullPost?.timeCreated), 'long')}
                </p>
              )}
            </div>
          </div>
          <hr className="full-post_line--actions" />
          <div className="full-post_comment">
            <input
              type="text"
              className="comment_input"
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
            />
            {fullPost && (
              <button
                className={cn('comment_submit')}
                type="submit"
                onClick={() => PostComment(comment, fullPost?.id)}
                disabled={comment.length === 0}
              >
                Post
              </button>
            )}
          </div>
        </div>
      </div>
      {popup && (
        <button
          className="page-popup_close"
          onClick={() => setActivePost(undefined)}
        >
          <CloseIcon height={24} width={24} />
        </button>
      )}

      {!popup && <hr className="fullpost-page_line" />}
      {!popup && (
        <div className="post-user_more-posts">
          <p className="post-user_more-posts_heading">
            More posts from{' '}
            <span className="post-user_more-posts_heading_user">
              {fullPost?.user.username}
            </span>
          </p>
          <div className="post-user_more-posts_posts">
            {postUserPosts?.map((post) => (
              <Link className="link-to" to={`/p/${post.id}`}>
                <PostPreview
                  post={post}
                  setActivePost={setActivePost}
                  setPopup={setPostPopup}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostFullView;
