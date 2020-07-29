import React from 'react';
import { User } from '../interfaces/user';
import { GetProfileImage } from '../helpers/getimage';
import './EditPassword.scss';
interface EditPasswordProps {
  user: User | undefined;
}
const EditPassword: React.FC<EditPasswordProps> = ({ user }) => {
  return (
    <div className="edit-password">
      <div className="edit-password_user">
        <img
          src={GetProfileImage(user)}
          alt={user?.username}
          className="edit-password_user_image"
        />
        <p className="edit-password_user_username">{user?.username}</p>
      </div>
      <form className="edit-password_form">
        <label htmlFor="old password" className="edit-password_form_label">
          Old Password
        </label>
        <input
          type="password"
          id="old password"
          className="edit-password_form_input"
        />
        <label htmlFor="new passwoed" className="edit-password_form_label">
          New Password
        </label>
        <input
          type="password"
          id="new password"
          className="edit-password_form_input"
        />
        <label htmlFor="repeat password" className="edit-password_form_label">
          Confirm New Password
        </label>
        <input
          type="password"
          id="repeat password"
          className="edit-password_form_input"
        />
        <button type="submit" className="edit-password_submit">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default EditPassword;
