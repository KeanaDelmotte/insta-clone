import React from 'react';
import { useState } from 'react';
import './AppsAndWebsites.scss';
import cn from 'classnames';
interface AppsAndWebsitesProps {}

const AppsAndWebsites: React.FC<AppsAndWebsitesProps> = () => {
  const [inActive, setInActive] = useState(true);
  const [inExpired, setInExpired] = useState(false);

  return (
    <div className="apps-and-websites">
      <h1 className="apps-and-websites_heading">Apps And Websites</h1>
      <nav className="apps-and-websites_navbar">
        <button
          onClick={() => {
            setInActive(true);
            setInExpired(false);
          }}
          className={cn('apps-and-websites_navitem', {
            'apps-and-websites_navitem--active': inActive,
          })}
        >
          ACTIVE
        </button>
        <button
          onClick={() => {
            setInActive(false);
            setInExpired(true);
          }}
          className={cn('apps-and-websites_navitem', {
            'apps-and-websites_navitem--active': inExpired,
          })}
        >
          EXPIRED
        </button>
      </nav>
      {inActive && (
        <div className="apps-and-websites_active">
          <p className="active_info">
            These are apps and websites you've used Instagram to log into and
            have recently used. They can request info you chose to share with
            them.
          </p>
          <p className="active_no-auth">
            You have not authorized any applications to access your Instagram
            accoun
          </p>
        </div>
      )}
      {inExpired && (
        <div className="apps-and-websites_expired">
          <p className="expired_info">
            These are apps and websites you've used Instagram to log into and
            may not have used in a while. They may still have access to info you
            previously shared, but their ability to make additional requests for
            private info has expired.
          </p>
          <p className="expired_no-auth">
            You have no expired applications that had access to your Instagram
            account.
          </p>
        </div>
      )}
    </div>
  );
};

export default AppsAndWebsites;
