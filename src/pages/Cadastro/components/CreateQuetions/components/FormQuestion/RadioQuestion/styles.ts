import styled from 'styled-components'
import Tooltip from '../../../../../../../components/Tooltip'

export const Container = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  position: relative;

  label {
    display: block;
    position: relative;
    width: 55px;
    height: 40px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  label input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  label span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 3px 4px;
    background-color: #ffffff;
    border-radius: 50%;
    border: 1px solid var(--secondary);
    text-align: center;
  }

  label input:checked ~ span {
    background: var(--secondary);
    color: #fff;
  }

  input:last-of-type {
    background: #fff;
    height: 45px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    border: none;
    padding: 0 10px;
    box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.1);
  }
`

export const Error = styled(Tooltip)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 5px;
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

  @media (max-width: 900px) {
    right: 50px;
  }
`
