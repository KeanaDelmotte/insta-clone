import React from 'react';
import NewMessageIcon from './icons/new-message.icon';
import './Message.scss';
import DirectMessageIcon from './icons/directmessage.icon';
import { FiSend } from 'react-icons/fi';
interface MessageProps {}
const Message: React.FC<MessageProps> = () => {
  return (
    <div className="message-page">
      <div className="message-page_messages">
        <div className="messages_navbar">
          <p className="navbar_title">Direct</p>
          <button className="navbar_compose">
            <NewMessageIcon height={24} width={24} />
          </button>
        </div>
        <div className="messages_chat">
          <div className="chat_userimg"></div>
        </div>
        <div className="messages_chat">
          <div className="chat_userimg"></div>
        </div>
        <div className="messages_chat">
          <div className="chat_userimg"></div>
        </div>
      </div>
      <div className="message-page_compose">
        <div className="compose_icon">
          <DirectMessageIcon height={45} width={45} />
        </div>
        <p className="compose_your-messages">Your Messages</p>
        <p className="compose_info">
          Send private photos and messages to a friend or group.
        </p>
        <button className="compose_send-message">Send Message</button>
      </div>
    </div>
  );
};

export default Message;
