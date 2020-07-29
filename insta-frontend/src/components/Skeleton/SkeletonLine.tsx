import React from 'react';
import SkeletonPulse from './SkeletonPulse';
import styled from "@emotion/styled";

const SkeletonLine = styled(SkeletonPulse)`
  width: 5.5em;
  border-radius: 5px;

  &::before {
    content: "\00a00";
  }
`
export default SkeletonLine;