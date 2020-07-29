import React from "react";
import { css, jsx } from '@emotion/core';

import styled from 'styled-components';
interface SliderContentprops {
  translate: number;
  transition: number;
  width: number;
}

const SliderContent: React.FC<SliderContentprops> = ({ transition, translate, width, children }) => {
  return (
    <div style={{
      transform: `translateX(-${translate}px)`,
      transition: `transform ease-out ${transition}s`,
      height: `100%`,
      width: `${width}px`,
      display: `flex`

    }} >{children}</div>
  )
}

export default SliderContent;