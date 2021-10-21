import styled, { css, keyframes } from 'styled-components'
import { animated } from 'react-spring'

interface ToastProps {
  type?: 'success' | 'error' | 'info'
  hasdescription: string
}

const toastTypeVariantions = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `
}

const toastSpanBackground = {
  info: css`
    background: #3172b7;
  `,
  success: css`
    background: #2e656a;
  `,
  error: css`
    background: #c53030;
  `
}

const animatedSpan = keyframes`
  from { width: 0% }
  to { width: 100% }
`

export const Container = styled(animated.div)<ToastProps>`
  width: 360px;
  position: relative;
  padding: 16px 30px 16px 16px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;

  & + div {
    margin-top: 6px;
  }

  ${(props) => toastTypeVariantions[props.type || 'info']}

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    strong {
      font-weight: 500;
    }

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 19px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${(props) =>
    !!props.hasdescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}

  span {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 6px;
    ${(props) => toastSpanBackground[props.type || 'info']}
    animation-name: ${animatedSpan};
    animation-duration: 6s;
  }

  @media (max-width: 350px) {
    width: 100%;

    div {
      flex: 1;
      strong {
        font-size: 14px;
      }

      p {
        font-size: 13px;
      }
    }
  }
`
