import React from 'react';
import './ManageContacts.scss';
const ManageContacts: React.FC = () => {
  return (
    <div className="manage-contacts">
      <h1 className="manage-contacts_heading">Manage Contacts</h1>
      <p className="manage-contacts_info">
        The people listed here are contacts you've uploaded to Instagram. To
        remove your synced contacts, tap Delete All. If you delete your contacts
        from this page, new contacts you add to your phone will be uploaded. If
        you want to stop syncing, go to your device settings and turn off access
        to contacts.
      </p>
      <p className="manage-contacts_disclaimer">
        Only you can see your contacts, but Instagram uses the info you've
        uploaded about your contacts to make friend suggestions for you and
        others and to provide a better experience for everyone.
      </p>
      <div className="manage-contacts_synced-contacts">
        <div className="synced-contacts_header">
          <p className="synced-contacts_header_amount">0 Synced Contacts</p>
          <button className="btn--bluetext btn--bluetext--disabled" disabled>
            Delete All
          </button>
        </div>
        <div className="synced-contacts_contacts">
          <hr className="contacts_line" />

          <p className="contacts_info">
            When you upload your contacts to Instagram, you'll see them here.
          </p>
          <hr className="contacts_line" />
        </div>
        <button className="synced-contacts_header_delete--blue" disabled>
          Delete All
        </button>
      </div>
    </div>
  );
};

export default ManageContacts;
