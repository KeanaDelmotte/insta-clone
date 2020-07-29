import React, { useEffect, useRef } from 'react';
import LikeIcon from './icons/like.icon';
import './Notifications.scss';
import { User } from '../interfaces/user';
import { fetchWithAuth, retrieveToken } from '../helpers/auth';
import { useState } from 'react';
import NotificationDisplay from './Notification';
import { Notification } from '../interfaces/notification';
import { Reply } from '../interfaces/reply';
interface NotificationsProps {
  user: User | undefined;

  onClose: () => void;
  followUser: (userId: string) => void;
}

const Notifications: React.FC<NotificationsProps> = ({
  onClose: handleClose,
  user,
  followUser,
}) => {
  const notificationsPopupRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>();

  useEffect(() => {
    fetchWithAuth(
      `http://localhost:3001/auth/notifications`,
      retrieveToken(),
    ).then(async (notificationsResp) => {
      setNotifications(await notificationsResp.json());
    });
    const closePopup = (event: MouseEvent) => {
      // console.log(event, notificationsPopupRef);

      if (
        notificationsPopupRef.current &&
        !notificationsPopupRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };
    document.addEventListener('mousedown', closePopup);

    return () => {
      document.removeEventListener('mousedown', closePopup);
    };
  }, [notificationsPopupRef, handleClose]);
  return (
    <div className="notifications_body" ref={notificationsPopupRef}>
      <div className="notifications">
        {notifications && notifications.length < 1 && (
          <>
            <div className="notifications_icon">
              <LikeIcon height={40} width={40} />
            </div>
            <h2 className="notifications_heading">Activity On Your Posts</h2>
            <p className="notifications_info">
              When someone likes on comments on your posts, you'll see it here.
            </p>
          </>
        )}
        {notifications &&
          notifications.length >= 1 &&
          notifications?.map((notification: Notification) =>
            notification.post ? (
              <div className="notifications_notification">
                <NotificationDisplay
                  initiator={notification.initiator}
                  type={notification.type}
                  date={notification.date}
                  post={notification.post}
                  commentContent={notification.commentContent}
                  replyContent={notification.replyContent}
                  followUser={followUser}
                />
                <hr className="notification_line" />
              </div>
            ) : (
              <div className="notifications_notification">
                <NotificationDisplay
                  initiator={notification.initiator}
                  type={notification.type}
                  date={notification.date}
                  followUser={followUser}
                />
                <hr className="notification_line" />
              </div>
            ),
          )}
      </div>

      <div className="notifications--before"></div>
      <div className="notifications--after"></div>
    </div>
  );
};

export default Notifications;
