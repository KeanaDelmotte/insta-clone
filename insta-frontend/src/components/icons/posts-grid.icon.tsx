import React from 'react';

interface PostsGridIconProps {
  height: number;
  width: number;
}

const PostsGridIcon: React.FC<PostsGridIconProps> = ({ height, width }) => {
  return (
    <svg
      aria-label="Posts"
      className="_8-yf5 "
      fill="#262626"
      height={height}
      viewBox="0 0 48 48"
      width={width}
    >
      <path
        clipRule="evenodd"
        d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default PostsGridIcon;
