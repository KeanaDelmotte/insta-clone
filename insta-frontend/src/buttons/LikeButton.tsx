import React, { useCallback } from 'react';
import { PostInterface } from '../interfaces/post';
import { useLoggedInUser } from '../contexts/UserContext';
import { fetchWithAuth, retrieveToken } from '../helpers/auth';
import LikeIcon from '../icons/like.icon';
import { CommentInterface } from '../interfaces/comment';
import { ReplyInterface } from '../interfaces/reply';

interface LikeButtonProps {
  post?: PostInterface | undefined;
  comment?: CommentInterface;
  reply?: ReplyInterface;
}


const LikeButton: React.FC<LikeButtonProps> = ({ post, comment, reply }) => {
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

  const LikeComment = (commentId: number) => {
    fetchWithAuth(`http://localhost:3001/posts/comments/${commentId}/like`, retrieveToken(), { method: "POST" })

  }

  const UnlikeComment = (commentId: number) => {
    fetchWithAuth(`http://localhost:3001/posts/comments/${commentId}/unlike`, retrieveToken(), { method: "POST" })

  }
  const LikeReply = (replyId: number) => {
    fetchWithAuth(`http://localhost:3001/posts/comments/replies/${replyId}/like`, retrieveToken(), { method: "POST" })
  }
  const UnlikeReply = (replyId: number) => {
    fetchWithAuth(`http://localhost:3001/posts/comments/replies/${replyId}/unlike`, retrieveToken(), { method: "POST" })

  }

  const RemovePostFromLikedPosts = () => {
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

  }

  const AddPostToLikedPosts = () => {
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

  const AddCommentToLikedComments = () => {
    if (loggedInUser && loggedInUser.likedComments && comment) {
      setLoggedInUser({
        ...loggedInUser,
        likedComments: [
          ...loggedInUser.likedComments,
          {
            id: comment?.id,
            contents: comment.contents,
            user: loggedInUser
          },
        ],
      });
    }
  }


  const AddReplyToLikedReplies = () => {
    if (loggedInUser && loggedInUser.likedReplies && reply) {
      setLoggedInUser({
        ...loggedInUser,
        likedReplies: [
          ...loggedInUser.likedReplies,
          {
            id: reply?.id,
            contents: reply.contents,
            user: loggedInUser
          },
        ],
      });
    }
  }




  const RemoveCommentFromLikedComments = () => {
    if (loggedInUser && loggedInUser.likedComments) {
      setLoggedInUser({
        ...loggedInUser, likedComments: [
          ...loggedInUser.likedComments.filter((likedComment) => likedComment.id !== comment?.id)
        ]
      })
    }
  }

  const RemoveReplyFromLikedComments = () => {
    if (loggedInUser && loggedInUser.likedReplies) {
      setLoggedInUser({
        ...loggedInUser, likedReplies: [
          ...loggedInUser.likedReplies.filter((likedReply) => likedReply.id !== reply?.id)
        ]
      })
    }
  }

  const PostButtonColor = loggedInUser?.likedPosts.find((p) => p.id === post?.id)
    ? '#ED4956'
    : undefined;

  const CommentButtonColor = loggedInUser?.likedComments.find((c) => c.id === comment?.id)
    ? '#262626'
    : undefined;

  const ReplyButtonColor = loggedInUser?.likedReplies.find((r) => r.id === reply?.id)
    ? '#262626'
    : undefined;
  return (
    <button
      className="actions_like"
      onClick={() => {
        if (post) {
          if (loggedInUser?.likedPosts.find((p) => p.id === post?.id)) { //if user has already liked post
            UnlikePost(post?.id);
            RemovePostFromLikedPosts()
          } else {
            LikePost(post?.id);
            AddPostToLikedPosts()

          }
        } else if (comment) {
          if (loggedInUser?.likedComments.find((c) => c.id === comment?.id)) { //if user has already liked comment
            UnlikeComment(comment?.id);
            RemoveCommentFromLikedComments()
          } else {
            LikeComment(comment?.id);
            AddCommentToLikedComments()

          }
        } else if (reply) {
          if (loggedInUser?.likedReplies.find((r) => r.id === reply.id)) { //if user has already liked reply
            UnlikeReply(reply?.id);
            RemoveReplyFromLikedComments()
          } else {
            LikeReply(reply?.id);
            AddReplyToLikedReplies()

          }
        }

      }}
    >
      <LikeIcon
        height={post ? 24 : 12}
        width={post ? 24 : 12}
        color={
          post ? PostButtonColor : comment ? CommentButtonColor : ReplyButtonColor
        }
      />
    </button >
  );
};

export default LikeButton;
