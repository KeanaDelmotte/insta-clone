import React from 'react';
import { useState } from 'react';
import './Expandabletext.scss';
interface ExpandableTextProps {
  content: string;
  limit: number;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({ content, limit }) => {
  const [showAll, setShowAll] = useState(false);
  const toShow = `${content.substr(0, limit)}...`;

  const showMore = () => {
    setShowAll(true);
  };

  return (
    <>
      {content.length <= limit && <p className="expandable-text">{content}</p>}
      {showAll && <p className="expandable-text">{content}</p>}
      {content.length > limit && !showAll && (
        <p className="expandable-text">
          {toShow}{' '}
          <span onClick={() => showMore()} className="expandable-text_expand">
            more
          </span>
        </p>
      )}
    </>
  );
};

export default ExpandableText;
