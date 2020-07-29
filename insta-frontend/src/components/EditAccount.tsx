import React from 'react';
import { useEffect } from 'react';
import { User } from '../interfaces/user';
import { userInfo } from 'os';
import { GetProfileImage } from '../helpers/getimage';
import './EditAccount.scss';
interface EditAccountProps {
  user: User | undefined;
}

const EditAccount: React.FC<EditAccountProps> = ({ user }) => {
  return (
    <div className="edit-account">
      <div className="edit-account_user">
        <img
          src={GetProfileImage(user)}
          alt={user?.username}
          className="edit-account_user_image"
        />
        <p className="edit-account_user_username">
          {user?.username}
          <button className="edit-account_user_change-profileimg btn--bluetext">
            Change Profile Photo
          </button>
        </p>
      </div>
      <form className="edit-account_form">
        <label className="edit-account_form_label" htmlFor="name">
          Name
        </label>
        <input className="edit-account_form_input" type="text" id="name" />
        <p className="form_name_disclaimer">
          Help people discover your account by using the name you're known by:
          either your full name, nickname, or business name.
          <br />
          You can only change your name twice within 14 days.
        </p>
        <label className="edit-account_form_label" htmlFor="username">
          Username
        </label>
        <input className="edit-account_form_input" type="text" id="username" />
        <label className="edit-account_form_label" htmlFor="website">
          Website
        </label>
        <input className="edit-account_form_input" type="text" id="website" />
        <label className="edit-account_form_label" htmlFor="bio">
          Bio
        </label>
        <textarea
          className="edit-account_form_input--bio"
          name="bio"
          id="bio"
          cols={30}
          rows={3}
        ></textarea>
        <p className="edit-account_personal">
          <span className="edit-account_personal--heading">
            Personal Information
          </span>
          Provide your personal information, even if the account is used for a
          business, a pet or something else. This won't be a part of your public
          profile.
        </p>

        <label className="edit-account_form_label" htmlFor="email">
          Email
        </label>
        <input className="edit-account_form_input" type="text" id="email" />
        <label className="edit-account_form_label" htmlFor="phone">
          Phone
        </label>
        <input className="edit-account_form_input" type="text" id="phone" />
        <label className="edit-account_form_label" htmlFor="gender">
          Gender
        </label>
        <input className="edit-account_form_input" type="text" id="gender" />
        <label className="edit-account_form_label" htmlFor="similar-accounts">
          Similar Accounts Suggestion
        </label>
        <input
          className="edit-account_form_input"
          type="checkbox"
          id="similar-accounts"
          checked={true}
        />
        <button className="form_submit">Submit</button>
      </form>
    </div>
  );
};

export default EditAccount;
