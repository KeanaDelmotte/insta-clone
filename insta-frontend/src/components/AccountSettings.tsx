import React from 'react';
import { Route, Link, useLocation } from 'react-router-dom';
import './AccountSettings.scss';
import cn from 'classnames';
import EditAccount from './EditAccount';
import { User } from '../interfaces/user';
import EditPassword from './EditPassword';
import AppsAndWebsites from './AppsAndWebsite';
import EmailsAndSms from './EmailsAndSms';
import PushNotifications from './PushNotifications';
import ManageContacts from './ManageContacts';
import PrivacyAndSecurity from './PrivacyAndSecurity';
import LoginActivity from './LoginActivity';
import EmailsFrom from './EmailsFrom';
import { useLoggedInUser } from '../contexts/UserContext';
interface AccountSettingsProps {
}
const AccountSettings: React.FC<AccountSettingsProps> = ({ }) => {
  let location = useLocation();
  return (
    <div className="account-settings">
      <nav className="account-settings_nav">
        <Link className="account-settings_linkto" to="/account/edit">
          <button
            className={cn('account-settings_nav-item nav_edit-profile ', {
              'account-settings_nav-item--selected':
                location.pathname === '/account/edit',
            })}
          >
            Edit Profile
          </button>
        </Link>
        <Link className="account-settings_linkto" to="/account/password/change">
          <button
            className={cn('account-settings_nav-item nav_change-password', {
              'account-settings_nav-item--selected':
                location.pathname === '/account/password/change',
            })}
          >
            Change Password
          </button>
        </Link>

        <Link className="account-settings_linkto" to="/account/manage_access">
          <button
            className={cn('account-settings_nav-item nav_apps-and-website', {
              'account-settings_nav-item--selected':
                location.pathname === '/account/manage_access',
            })}
          >
            Apps And Websites
          </button>
        </Link>

        <Link className="account-settings_linkto" to="/account/email/settings">
          <button
            className={cn('account-settings_nav-item nav_email-and-sms', {
              'account-settings_nav-item--selected':
                location.pathname === '/account/email/settings',
            })}
          >
            Email and SMS
          </button>
        </Link>

        <Link
          className="account-settings_linkto"
          to="/account/push/web/settings"
        >
          <button
            className={cn('account-settings_nav-item nav_push-notifications', {
              'account-settings_nav-item--selected':
                location.pathname === '/account/push/web/settings',
            })}
          >
            Push Notifications
          </button>
        </Link>

        <Link className="account-settings_linkto" to="/account/contact_history">
          <button
            className={cn('account-settings_nav-item nav_manage-contacts', {
              'account-settings_nav-item--selected':
                location.pathname === '/account/contact_history',
            })}
          >
            Manage Contacts
          </button>
        </Link>

        <Link
          className="account-settings_linkto"
          to="/account/privacy_and_security"
        >
          <button
            className={cn(
              'account-settings_nav-item nav_privacy-and-security',
              {
                'account-settings_nav-item--selected':
                  location.pathname === '/account/privacy_and_security',
              },
            )}
          >
            Privacy and Security
          </button>
        </Link>

        <Link className="account-settings_linkto" to="/account/login_activity">
          <button
            className={cn('account-settings_nav-item nav_login-activity', {
              'account-settings_nav-item--selected':
                location.pathname === '/account/login_activity',
            })}
          >
            Login Activity
          </button>
        </Link>

        <Link className="account-settings_linkto" to="/account/emails_sent">
          <button
            className={cn('account-settings_nav-item nav_emails-from-insta', {
              'account-settings_nav-item--selected':
                location.pathname === '/account/emails_sent',
            })}
          >
            Emails From Instagram
          </button>
        </Link>
      </nav>
      <div className="account-settings_settings">
        <Route path="/account/edit">
          <EditAccount />
        </Route>
        <Route path="/account/password/change">
          <EditPassword />
        </Route>
        <Route path="/account/manage_access">
          <AppsAndWebsites />
        </Route>
        <Route path="/account/email/settings">
          <EmailsAndSms />
        </Route>
        <Route path="/account/push/web/settings">
          <PushNotifications />
        </Route>
        <Route path="/account/contact_history">
          <ManageContacts />
        </Route>
        <Route path="/account/privacy_and_security">
          <PrivacyAndSecurity />
        </Route>
        <Route path="/account/login_activity">
          <LoginActivity />
        </Route>
        <Route path="/account/emails_sent">
          <EmailsFrom />
        </Route>
      </div>
    </div>
  );
};
export default AccountSettings;
