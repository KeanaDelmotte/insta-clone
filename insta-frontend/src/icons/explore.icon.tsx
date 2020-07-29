import React from 'react';
import './icons.scss';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';

interface ExploreIconProps {
  height: number;
  width: number;
}

const ExploreIcon: React.FC<ExploreIconProps> = ({ height, width }) => {
  let location = useLocation();
  const inExplore = location.pathname === '/discover';

  return (
    <svg
      aria-label="Find People"
      height={height}
      viewBox="0 0 48 48"
      width={width}
      className={cn({ nav_selected: inExplore })}
    >
      {inExplore && (
        <path
          clipRule="evenodd"
          d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm12.2 13.8l-7 14.8c-.1.3-.4.6-.7.7l-14.8 7c-.2.1-.4.1-.6.1-.4 0-.8-.2-1.1-.4-.4-.4-.6-1.1-.3-1.7l7-14.8c.1-.3.4-.6.7-.7l14.8-7c.6-.3 1.3-.2 1.7.3.5.4.6 1.1.3 1.7zm-15 7.4l-5 10.5 10.5-5-5.5-5.5z"
          fillRule="evenodd"
        ></path>
      )}
      {!inExplore && (
        <path
          clipRule="evenodd"
          d="M24 .5C37 .5 47.5 11 47.5 24S37 47.5 24 47.5.5 37 .5 24 11 .5 24 .5zm0 44c11.3 0 20.5-9.2 20.5-20.5S35.3 3.5 24 3.5 3.5 12.7 3.5 24 12.7 44.5 24 44.5zm-4.4-23.7c.3-.5.7-.9 1.2-1.2l14.8-8.1c.3-.1.6-.1.8.1.2.2.3.5.1.8l-8.1 14.8c-.3.5-.7.9-1.2 1.2l-14.8 8.1c-.3.1-.6.1-.8-.1-.2-.2-.3-.5-.1-.8l8.1-14.8zm6.2 5l4.3-7.8-7.8 4.3 3.5 3.5z"
          fillRule="evenodd"
        ></path>
      )}
    </svg>
  );
};

export default ExploreIcon;
