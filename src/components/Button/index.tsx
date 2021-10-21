import { ButtonHTMLAttributes, ReactNode } from 'react'
import { Container } from './styles'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  color: 'primary' | 'secondary' | 'delete'
}

export const Button = ({ children, color, ...rest }: IButtonProps) => {
  return (
    <Container {...rest} color={color}>
      {children}
    </Container>
  )
}
