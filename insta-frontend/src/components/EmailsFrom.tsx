import React from 'react';
import './EmailsFrom.scss';
import { useState } from 'react';
import cn from 'classnames';

const EmailsFrom: React.FC = () => {
  const [inSecurity, setInSecurity] = useState(true);
  return (
    <div className="emails-from">
      <h1 className="emails-from_heading">Emails From Instagram</h1>
      <nav className="emails-from_nav">
        <button
          className={cn('emails-from_nav_item', {
            'emails-from_nav_item--selected': inSecurity,
          })}
          onClick={() => setInSecurity(true)}
        >
          SECURITY
        </button>
        <button
          className={cn('emails-from_nav_item', {
            'emails-from_nav_item--selected': !inSecurity,
          })}
          onClick={() => setInSecurity(false)}
        >
          OTHER
        </button>
      </nav>

      {inSecurity && (
        <p className="security-emails_info">
          This is a list of emails Instagram has sent you about security and
          login in the last 14 days. You can use it to verify which emails are
          real and which are fake. Learn more.
        </p>
      )}

      {!inSecurity && (
        <p className="other-emails_info">
          This is a list of the emails Instagram has sent you in the last 14
          days that aren't about security or login. You can use it to verify
          which emails are real and which are fake. Learn more.
        </p>
      )}
    </div>
  );
};

export default EmailsFrom;
