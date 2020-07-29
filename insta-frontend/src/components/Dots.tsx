import React from 'react';
import cn from 'classnames';
import "./Dots.scss";
interface DotsProps {
  slides: string[];
  activeIndex: number;
}

const Dots: React.FC<DotsProps> = ({ slides, activeIndex }) => {
  return (
    <div className='slideshow-dots'>
      {slides.map((slide, i) => (
        <span className={cn('dots_dot', { 'dots_dot--active': activeIndex === i })}></span>
      ))}
    </div>
  )
}

export default Dots;