import styled from 'styled-components'
import { shade } from 'polished'

interface IContainerProps {
  color: string
}

const colors: any = {
  primary: '#25232F',
  secondary: '#413D51',
  delete: '#E35151'
}

export const Container = styled.button<IContainerProps>`
  background: ${(props) => colors[props.color]};
  color: var(--text);
  padding: 16px 20px;
  height: 100%;
  border-radius: 4px;
  transition: background 0.4s;

  &:hover {
    background: ${(props) => shade(0.2, colors[props.color])};
  }
`