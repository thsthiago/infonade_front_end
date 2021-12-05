import styled from 'styled-components'
import Tooltip from '../Tooltip'

export const Container = styled.div`
  background: #fff;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.1);
  padding: 10px;

  textarea {
    resize: none;
    width: 100%;
    height: 120px;
    border: none;
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
