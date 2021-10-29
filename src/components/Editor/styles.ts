import styled from 'styled-components'
import Tooltip from '../Tooltip'

export const Container = styled.div`
  position: relative;
  width: 100%;
`

export const Error = styled(Tooltip)`
  position: absolute;
  top: 34.5%;
  right: 50%;
  transform: translateX(50%);
  height: 20px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: var(--text);
    &::before {
      border-color: #c53030 transparent;
    }
  }

  @media (max-width: 700px) {
    top: 40%;
  }

  @media (max-width: 470px) {
    top: 45%;
  }

  @media (max-width: 360px) {
    top: 50%;
  }
`
