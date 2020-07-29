import React from 'react';
import './PushNotifications.scss';
const PushNotifications: React.FC = () => {
  return (
    <form className="push-notifications">
      <div className="push-notifications_notification">
        <p className="notification_heading">Likes</p>

        <div className="notification_option">
          <input
            type="radio"
            name="likes"
            id="likes-off"
            className="notification_input"
          />
          <label htmlFor="likes-off" className="notification_label">
            Off
          </label>
        </div>

        <div className="notification_option">
          <input
            type="radio"
            name="likes"
            id="likes-specific"
            className="notification_input"
          />
          <label htmlFor="likes-specific" className="notification_label">
            From People I Follow
          </label>
        </div>

        <div className="notification_option">
          <input
            type="radio"
            name="likes"
            id="likes-on"
            className="notification_input"
            checked
          />
          <label htmlFor="likes-on" className="notification_label">
            From Everyone
          </label>
        </div>
        <p className="notification_example">johnappleseed liked your photo</p>
        <hr className="push-notifications_notification_line" />
      </div>

      <div className="push-notifications_notification">
        <p className="notification_heading">Comments</p>
        <div className="notification_option">
          <input
            type="radio"
            name="comments"
            id="comments-off"
            className="notification_input"
          />
          <label htmlFor="likes-off" className="notification_label">
            Off
          </label>
        </div>

        <div className="notification_option">
          <input
            type="radio"
            name="comments"
            id="comments-specific"
            className="notification_input"
          />
          <label htmlFor="likes-specific" className="notification_label">
            From People I Follow
          </label>
        </div>

        <div className="notification_option">
          <input
            type="radio"
            name="comments"
            id="comments-on"
            className="notification_input"
            checked
          />
          <label htmlFor="likes-on" className="notification_label">
            From Everyone
          </label>
        </div>
        <p className="notification_example">
          johnappleseed commented 'nice shot!'
        </p>
        <hr className="push-notifications_notification_line" />
      </div>

      <div className="push-notifications_notification">
        <p className="notification_heading">Comment Likes</p>

        <div className="notification_option">
          <input
            type="radio"
            name="comment-likes"
            id="comment-likes-off"
            className="notification_input"
          />
          <label htmlFor="likes-off" className="notification_label">
            Off
          </label>
        </div>

        <div className="notification_option">
          <input
            type="radio"
            name="comment-likes"
            id="comment-likes-specific"
            className="notification_input"
          />
          <label htmlFor="likes-specific" className="notification_label">
            From People I Follow
          </label>
        </div>

        <div className="notification_option">
          <input
            type="radio"
            name="comment-likes"
            id="comment-likes-on"
            className="notification_input"
            checked
          />
          <label htmlFor="likes-on" className="notification_label">
            From Everyone
          </label>
        </div>
        <p className="notification_example">
          johnappleseed liked your comment 'nice shot!'
        </p>
        <hr className="push-notifications_notification_line" />
      </div>

      <div className="push-notifications_notification">
        <p className="notification_heading">
          Likes And Comments On Photos Of You
        </p>
        <div className="notification_option">
          <input
            type="radio"
            name="likes and comments"
            id="likes-and-comments-off"
            className="notification_input"
          />
          <label htmlFor="likes-off" className="notification_label">
            Off
          </label>
        </div>

        <div className="notification_option">
          <input
            type="radio"
            name="likes and comments"
            id="likes-and-comments-specific"
            className="notification_input"
          />
          <label htmlFor="likes-specific" className="notification_label">
            From People I Follow
          </label>
        </div>

        <div className="notification_option">
          <input
            type="radio"
            name="likes and comments"
            id="likes-and-comments-on"
            className="notification_input"
            checked
          />
          <label htmlFor="likes-on" className="notification_label">
            From Everyone
          </label>
        </div>
        <p className="notification_example">
          johnappleseed commented on a post you're tagged in
        </p>
        <hr className="push-notifications_notification_line" />
      </div>

      <div className="push-notifications_notification">
        <p className="notification_heading">Accepted Follow Requests</p>

        <div className="notification_option">
          <input
            type="radio"
            name="accepted-follow"
            id="accepted-follow-off"
            className="notification_input"
          />
          <label htmlFor="likes-off" className="notification_label">
            Off
          </label>
        </div>

        <div className="notification_option">
          <input
            type="radio"
            name="accepted-follow"
            id="accepted-follow-on"
            className="notification_input"
            checked
          />
          <label htmlFor="likes-on" className="notification_label">
            From Everyone
          </label>
        </div>
        <p className="notification_example">
          John Appleseed ( johnappleseed) accepted your follow request
        </p>
        <hr className="push-notifications_notification_line" />
      </div>

      <div className="push-notifications_notification">
        <p className="notification_heading">Friends on Instagram</p>
        <div className="notification_option">
          <input
            type="radio"
            name="friends-on-insta"
            id="friends-on-insta-follow-off"
            className="notification_input"
          />
          <label htmlFor="likes-off" className="notification_label">
            Off
          </label>
        </div>

        <div className="notification_option">
          <input
            type="radio"
            name="friends-on-insta"
            id="friends-on-insta-follow-on"
            className="notification_input"
            checked
          />
          <label htmlFor="likes-on" className="notification_label">
            From Everyone
          </label>
        </div>
        <p className="notification_example">
          Your Facebook friend John Appleseed is on Instagram as johnappleseed
        </p>
        <hr className="push-notifications_notification_line" />
      </div>

      <div className="push-notifications_notification">
        <p className="notification_heading">Instagram Direct Requests</p>

        <div className="notification_option">
          <input
            type="radio"
            name="direct-req"
            id="direct-req-off"
            className="notification_input"
          />
          <label htmlFor="likes-off" className="notification_label">
            Off
          </label>
        </div>

        <div className="notification_option">
          <input
            type="radio"
            name="direct-req"
            id="direct-req-on"
            className="notification_input"
            checked
          />
          <label htmlFor="likes-on" className="notification_label">
            From Everyone
          </label>
        </div>
        <p className="notification_example">
          johnappleseed wants to send you a message
        </p>
        <hr className="push-notifications_notification_line" />
      </div>

      <div className="push-notifications_notification">
        <p className="notification_heading">Instagram Direct </p>

        <div className="notification_option">
          <input
            type="radio"
            name="direct"
            id="direct-off"
            className="notification_input"
          />
          <label htmlFor="likes-off" className="notification_label">
            Off
          </label>
        </div>

        <div className="notification_option">
          <input
            type="radio"
            name="direct"
            id="direct-on"
            className="notification_input"
            checked
          />
          <label htmlFor="likes-on" className="notification_label">
            From Everyone
          </label>
        </div>
        <p className="notification_example">johnappleseed sent you a message</p>
        <hr className="push-notifications_notification_line" />
      </div>

      <div className="push-notifications_notification">
        <p className="notification_heading">Reminders </p>

        <div className="notification_option">
          <input
            type="radio"
            name="reminders"
            id="reminders-off"
            className="notification_input"
          />
          <label htmlFor="likes-off" className="notification_label">
            Off
          </label>
        </div>

        <div className="notification_option">
          <input
            type="radio"
            name="reminders"
            id="reminders-on"
            className="notification_input"
            checked
          />
          <label htmlFor="likes-on" className="notification_label">
            From Everyone
          </label>
        </div>
        <p className="notification_example">
          you have unseed notifiations and other similar notifications
        </p>
        <hr className="push-notifications_notification_line" />
      </div>

      <div className="push-notifications_notification">
        <p className="notification_heading">First Posts and Stories</p>

        <div className="notification_option">
          <input
            type="radio"
            name="first-posts"
            id="first-posts-off"
            className="notification_input"
          />
          <label htmlFor="likes-off" className="notification_label">
            Off
          </label>
        </div>

        <div className="notification_option">
          <input
            type="radio"
            name="first-posts"
            id="first-posts-specific"
            className="notification_input"
          />
          <label htmlFor="likes-specific" className="notification_label">
            From People I Follow
          </label>
        </div>

        <div className="notification_option">
          <input
            type="radio"
            name="first-posts"
            id="first-posts-on"
            className="notification_input"
            checked
          />
          <label htmlFor="likes-on" className="notification_label">
            From Everyone
          </label>
        </div>
        <p className="notification_example">
          See johnappleseed's first story on Instagram and other similar
          notifications
        </p>
        <hr className="push-notifications_notification_line" />
      </div>

      <div className="push-notifications_notification">
        <p className="notification_heading">Igtv View Counts </p>

        <div className="notification_option">
          <input
            type="radio"
            name="igtv"
            id="igtv-off"
            className="notification_input"
          />
          <label htmlFor="likes-off" className="notification_label">
            Off
          </label>
        </div>

        <div className="notification_option">
          <input
            type="radio"
            name="igtv"
            id="igtv-on"
            className="notification_input"
            checked
          />
          <label htmlFor="likes-on" className="notification_label">
            From Everyone
          </label>
        </div>

        <p className="notification_example">
          Your IGTV video has more than 100K views: 'My New Video!'
        </p>
        <hr className="push-notifications_notification_line" />
      </div>

      <div className="push-notifications_notification">
        <p className="notification_heading">Support Requests</p>

        <div className="notification_option">
          <input
            type="radio"
            name="support-req"
            id="support-req-off"
            className="notification_input"
          />
          <label htmlFor="likes-off" className="notification_label">
            Off
          </label>
        </div>

        <div className="notification_option">
          <input
            type="radio"
            name="support-req"
            id="support-req-on"
            className="notification_input"
            checked
          />
          <label htmlFor="likes-on" className="notification_label">
            On
          </label>
        </div>
        <p className="notification_example">
          Your support request from July 10 was just updated
        </p>
        <hr className="push-notifications_notification_line" />
      </div>

      <div className="push-notifications_notification">
        <p className="notification_heading">Live Videos</p>

        <div className="notification_option">
          <input
            type="radio"
            name="live-vids"
            id="live-vid-off"
            className="notification_input"
          />
          <label htmlFor="likes-off" className="notification_label">
            Off
          </label>
        </div>

        <div className="notification_option">
          <input
            type="radio"
            name="live-vids"
            id="live-vid-on"
            className="notification_input"
            checked
          />
          <label htmlFor="likes-on" className="notification_label">
            On
          </label>
        </div>
        <p className="notification_example">
          johnappleseed just started a live video. Watch it before it ends!
        </p>
        <hr className="push-notifications_notification_line" />
      </div>
    </form>
  );
};

export default PushNotifications;
