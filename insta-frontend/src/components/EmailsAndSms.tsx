import React from 'react';
import './EmailsAndSms.scss';

interface EmailsAndSmsProps {}

const EmailsAndSms: React.FC<EmailsAndSmsProps> = () => {
  return (
    <div className="emails-and-sms">
      <h1 className="emails-and-sms_heading">Subscribe to: </h1>
      <form action="" className="emails-and-sms_form">
        <input
          type="checkbox"
          className="emails-and-sms_checkbox emails-and-sms_feedback"
          id="feedback"
          checked={true}
        />
        <label htmlFor="feedback" className="emails-and-sms_label">
          Feedback Emails
        </label>
        <p className="emails-and-sms_info">Give feedback on Instagram</p>
        <input
          type="checkbox"
          className="emails-and-sms_checkbox emails-and-sms_reminder"
          id="reminder"
          checked={true}
        />
        <label htmlFor="reminder" className="emails-and-sms_label">
          Reminder Emails
        </label>
        <p className="emails-and-sms_info">
          Get notifications you might have missed
        </p>

        <input
          type="checkbox"
          className="emails-and-sms_checkbox emails-and-sms_product"
          id="product"
          checked={true}
        />
        <label htmlFor="product" className="emails-and-sms_label">
          Product Emails
        </label>
        <p className="emails-and-sms_info">Get tips about Instagram's tools</p>

        <input
          type="checkbox"
          className="emails-and-sms_checkbox emails-and-sms_news"
          id="news"
          checked={true}
        />
        <label htmlFor="news" className="emails-and-sms_label">
          News Emails
        </label>
        <p className="emails-and-sms_info">
          Learn about new Instagram features
        </p>

        <input
          type="checkbox"
          className="emails-and-sms_checkbox emails-and-sms_sms"
          id="sms"
          checked={true}
        />
        <label htmlFor="sms" className="emails-and-sms_label">
          Text (SMS) messages
        </label>
        <p className="emails-and-sms_info">Get notifications by text message</p>
      </form>
    </div>
  );
};

export default EmailsAndSms;
