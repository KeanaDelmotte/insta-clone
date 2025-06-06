import React from 'react';
import './icons.scss';

interface ShareIconProps {
  height: number;
  width: number;
}

const ShareIcon: React.FC<ShareIconProps> = ({ height, width }) => {
  return (
    <svg
      aria-label="Share Post"
      className="_8-yf5 "
      fill="#262626"
      height={height}
      viewBox="0 0 48 48"
      width={width}
    >
      <path d="M46.5 3.5h-45C.6 3.5.2 4.6.8 5.2l16 15.8 5.5 22.8c.2.9 1.4 1 1.8.3L47.4 5c.4-.7-.1-1.5-.9-1.5zm-40.1 3h33.5L19.1 18c-.4.2-.9.1-1.2-.2L6.4 6.5zm17.7 31.8l-4-16.6c-.1-.4.1-.9.5-1.1L41.5 9 24.1 38.3z"></path>
      <path d="M14.7 48.4l2.9-.7"></path>
    </svg>
  );
};

export default ShareIcon;
