import styled, { keyframes } from 'styled-components'

const animateIncrease = keyframes`
  from { left: -5%; width: 5%; }
  to { left: 130%; width: 100%;}
`

const animateDecrease = keyframes`
  from { left: -80%; width: 80%; }
  to { left: 110%; width: 10%;}
`

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 80px;
  width: calc(100% - 80px);
  height: 7px;
  overflow-x: hidden;

  .line {
    position: absolute;
    opacity: 0.4;
    background: var(--primary);
    width: 150%;
    height: 7px;
  }

  .subline {
    position: absolute;
    background: var(--primary);
    height: 7px;
  }
  .inc {
    animation: ${animateIncrease} 1s infinite;
  }
  .dec {
    animation: ${animateDecrease} 1s infinite;
  }
`
