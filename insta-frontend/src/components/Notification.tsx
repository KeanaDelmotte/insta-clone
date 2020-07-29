import React from 'react';
import { Notification, NotificationType } from '../interfaces/notification';
import { User } from '../interfaces/user';
import { PostInterface } from '../interfaces/post';
import { GetProfileImage, GetPhoto } from '../helpers/getimage';
import { GetTimeSinceDate } from '../helpers/formatTimeFromDate';
import './Notification.scss';
import { Link } from 'react-router-dom';
import FollowButton from './buttons/FollowBtn';
interface NotificationProps {
  initiator: User;
  type: NotificationType;
  date: Date;
  post?: PostInterface;
  commentContent?: string;
  replyContent?: string;
  followUser: (userId: string) => void;
}

const NotificationDisplay: React.FC<NotificationProps> = ({
  initiator,
  type,
  date,
  post,
  commentContent,
  replyContent,
  followUser,
}) => {
  console.log(type);
  return (
    <div className="notification-display">
      <Link to={`/profile/${initiator.username}`} className="link-to-profile">
        {' '}
        <img
          src={GetProfileImage(initiator)}
          alt={initiator.username}
          className="notification-display_userimg"
        />
      </Link>
      <Link to={`/profile/${initiator.username}`} className="link-to-profile">
        <p className="notification-display_username">{initiator.username}</p>
      </Link>

      <p className="notification-display_type">
        {commentContent &&
          type === NotificationType.COMMENTED &&
          `commented: ${commentContent}`}
        {replyContent &&
          type === NotificationType.REPLIED &&
          `mentioned you in a comment: ${replyContent}`}
        {type === NotificationType.FOLLOWED && `started following you`}

        {type === NotificationType.LIKED_REPLY &&
          `mentioned you in a comment: ${replyContent}`}
        {type === NotificationType.LIKED_POST && `liked your post`}
        {type === NotificationType.TAGGED && `tagged you in a post`}

        <p className="notification-display_date">
          {GetTimeSinceDate(new Date(date), 'short')}
        </p>
      </p>
      {post && (
        <div className="notification-display_post">
          <img
            src={GetPhoto(post.photos[0].filename)}
            alt={post.description}
            className="notification-display_post--img"
          />
        </div>
      )}
      {type === NotificationType.FOLLOWED && (
        <div className="notification-display_followuser">
          <FollowButton
            user={{
              user: initiator,
              suggestion: { priority: 1, reason: 'Follows you' },
            }}
            btnfilled={true}
          />
        </div>
      )}
    </div>
  );
};

export default NotificationDisplay;
