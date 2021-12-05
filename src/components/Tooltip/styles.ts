import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  span {
    width: 160px;
    background: var(--delete-btn);
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;
    text-align: center;
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    color: var(--text);
    font-family: 'Roboto', sans-serif;
    &::before {
      content: '';
      border-style: solid;
      border-color: var(--delete-btn) transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  &:hover span {
    opacity: 1;
    visibility: visible;
  }
  @media (max-width: 900px) {
    position: initial;
    span {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`
