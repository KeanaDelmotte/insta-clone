import React from 'react';
import cn from 'classnames'
import "./Arrow.scss";
import leftArrow from '../img/left-arrow.svg'
import rightArrow from '../img/right-arrow.svg'
import { AiOutlineRightCircle } from "react-icons/ai";
import { AiOutlineLeftCircle } from "react-icons/ai";

interface ArrowProps {
  direction: string;
  handleClick: () => void;
}
const Arrow: React.FC<ArrowProps> = ({ direction, handleClick }) => {
  return (
    <div onClick={() => handleClick()} className={cn('slideshow-arrow', { 'slideshow-arrow--left': direction === 'left' }, { 'slideshow-arrow--right': direction === 'right' })}>
      {direction === 'right' && (
        <AiOutlineRightCircle className='slideshow-arrow--right' size={24} fill='white' />
      )}
      {direction === 'left' && (
        <AiOutlineLeftCircle className="slideshow-arrow--left" size={24} fill='white' />
      )}
    </div >
  )
}

export default Arrow;