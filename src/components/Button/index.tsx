import { ReactNode, useCallback } from 'react'
import { Container } from './styles'

interface IButtonProps {
  fn(): void
  children: ReactNode
  color: 'primary' | 'secondary' | 'delete'
}

export const Button = ({ fn, children, color }: IButtonProps) => {
  const handleClick = useCallback(() => {
    fn()
  }, [])

  return (
    <Container onClick={handleClick} color={color}>
      {children}
    </Container>
  )
}
