import styled, { keyframes } from 'styled-components'
import { LoadingProps } from '.'

const LoadingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const Container = styled.div<LoadingProps>`
  display: inline-block;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};

  &:after {
    content: ' ';
    display: block;
    width: ${(props) => `${props.size}px`};
    height: ${(props) => `${props.size}px`};
    border-radius: 50%;
    border: ${(props) => `${props.border}px`} solid var(--primary);
    border-color: ${(props) =>
      props.color
        ? `${props.color} transparent ${props.color} transparent`
        : 'var(--primary) transparent var(--primary) transparent;'};
    animation: ${LoadingAnimation} 1.2s linear infinite;
  }
`
