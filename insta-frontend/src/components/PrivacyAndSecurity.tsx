import React from 'react';
import './PrivacyAndSecurity.scss';

const PrivacyAndSecurity: React.FC = () => {
  return (
    <div className="privacy-and-security">
      <div className="account-privacy">
        <h1 className="privacy-and-security_heading">Account Privacy</h1>
        <input
          type="checkbox"
          id="account-privacy"
          className="account-privacy_input"
        />
        <label htmlFor="account-privacy" className="privacy-and-security_label">
          Private account
        </label>
        <p className="info-text--med">
          When your account is private, only people you approve can see your
          photos and videos on Instagram. Your existing followers won't be
          affected.
        </p>
        <hr className="privacy-and-security_line" />
      </div>
      <div className="activity-status">
        <h1 className="privacy-and-security_heading">Activity Status</h1>
        <input
          type="checkbox"
          id="activity-status"
          className="activity-status_input"
          checked
        />
        <label htmlFor="activity-status" className="privacy-and-security_label">
          Show Activity Status
        </label>
        <p className="info-text--med">
          Allow accounts you follow and anyone you message to see when you were
          last active on Instagram apps. When this is turned off, you won't be
          able to see the activity status of other accounts.
        </p>
        <hr className="privacy-and-security_line" />
      </div>

      <div className="story-sharing">
        <h1 className="privacy-and-security_heading">Story Sharing</h1>
        <input
          type="checkbox"
          id="story-sharing"
          className="story-sharing_input"
          checked
        />
        <label htmlFor="story-sharing" className="privacy-and-security_label">
          Allow Sharing
        </label>
        <p className="info-text--med">
          Allow accounts you follow and anyone you message to see when you were
          last active on Instagram apps. When this is turned off, you won't be
          able to see the activity status of other accounts.
        </p>
        <hr className="privacy-and-security_line" />
      </div>
      <div className="privacy-and-security_comments">
        <h1 className="privacy-and-security_heading">Comments</h1>
        <button className="btn--bluetext">Edit Comment Settings</button>
        <hr className="privacy-and-security_line" />
      </div>

      <div className="photos-of-you">
        <h1 className="privacy-and-security_heading">Photos Of You</h1>
        <div className="photos-of-you_auto">
          <input
            type="radio"
            id="auto"
            name="photos-of-you"
            className="photos-of-you_radio"
            checked
          />
          <label htmlFor="auto" className="privacy-and-security_label">
            Add Automatically
          </label>
        </div>
        <div className="photos-of-you_manual">
          <input
            type="radio"
            id="manual"
            name="photos-of-you"
            className="photos-of-you_radio"
          />
          <label htmlFor="manual" className="privacy-and-security_label">
            Add Manually
          </label>
        </div>

        <p className="info-text--med">
          Choose how you want photos of you added to your profile. Learn more
          about Photos of You.
        </p>
        <hr className="privacy-and-security_line" />
      </div>

      <div className="privacy-and-security_account-data">
        <h1 className="privacy-and-security_heading">Account Data</h1>
        <button className="btn--bluetext">View Account Data</button>
        <hr className="privacy-and-security_line" />
      </div>

      <div className="privacy-and-security_fwo-factor">
        <h1 className="privacy-and-security_heading">
          Two-Factor Authentication
        </h1>
        <button className="btn--bluetext">
          Edit Two-Factor Authentication Settings
        </button>
        <hr className="privacy-and-security_line" />
      </div>

      <div className="privacy-and-security_data-download">
        <h1 className="privacy-and-security_heading">Data Download</h1>
        <button className="btn--bluetext">Request Download</button>
        <hr className="privacy-and-security_line" />
      </div>

      <div className="privacy-and-security_help">
        <h1 className="privacy-and-security_heading">
          Privacy and Security Help
        </h1>
        <button className="btn--bluetext">Support</button>
      </div>
    </div>
  );
};

export default PrivacyAndSecurity;
