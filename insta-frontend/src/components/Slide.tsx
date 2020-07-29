import React from "react";
import SkeletonLine from "./Skeleton/SkeletonLine";

interface SlideProps {
  content: string;
}

const Slide: React.FC<SlideProps> = ({ content }) => {

  return (
    <>
      <div
        style={{
          display: 'block',
          height: `100`,
          width: `100%`,
          backgroundImage: `url(${content})`,
          backgroundSize: `cover`,
          backgroundRepeat: `no-repeat`,
          backgroundPosition: `center`

        }}>

      </div>
    </>
  )
}

export default Slide;
