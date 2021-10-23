import styled, { css } from 'styled-components'
import Tooltip from '../Tooltip'

interface InputProps {
  isErrored: boolean
}

export const Container = styled.div<InputProps>`
  background: #fff;
  height: 45px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.1);

  div:first-child {
    width: 50px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px 0px 0px 10px;
  }

  input {
    flex: 1;
    color: var(--color);
    border: none;
    padding-left: 10px;
    &::placeholder {
      color: #adaeb0;
    }
  }

  & + div {
    margin-top: 10px;
  }

  @media (max-width: 900px) {
    position: relative;
  }
`

export const Error = styled(Tooltip)`
  height: 20px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
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
`
