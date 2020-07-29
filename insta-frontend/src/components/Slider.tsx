import React, { useState } from 'react';
import "./Slider.scss";
import SliderContent from './SliderContent';
import Slide from './Slide';
import Arrow from './Arrow';
import Dots from './Dots';
import { PostInterface } from '../interfaces/post';
import { GetPhoto } from '../helpers/getimage';
import cn from 'classnames';
interface SlideShowProps {
  post: PostInterface | undefined;
  className?: string;
}
const SlideShow: React.FC<SlideShowProps> = ({ post, className }) => {
  const getWidth = () => window.innerWidth;
  const [state, setState] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0.45
  })

  let slides: string[] = []

  post?.photos.map(photo => {
    slides.push(GetPhoto(photo.filename))
  })


  const { translate, transition, activeIndex } = state;

  const nextSlide = () => {


    setState({
      ...state,
      activeIndex: activeIndex + 1,
      translate: (activeIndex + 1) * 615
    })
  }

  const prevSlide = () => {

    setState({
      ...state,
      activeIndex: activeIndex - 1,
      translate: (activeIndex - 1) * 615
    })
  }


  return (
    <div className={`slider ${className}`}>
      <SliderContent translate={translate} transition={transition} width={615 * slides.length}>
        {slides.map((slide, i) => (
          <Slide key={slide} content={slide} />
        ))}
      </SliderContent>
      {activeIndex >= 1 && (
        <Arrow direction={'left'} handleClick={prevSlide} />

      )}
      {activeIndex < (slides.length - 1) && (
        <Arrow direction={'right'} handleClick={nextSlide} />

      )}
      {slides.length > 1 && (
        <Dots slides={slides} activeIndex={activeIndex} />

      )}

    </div>
  )
}

export default SlideShow;