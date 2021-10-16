import { ReactNode, useCallback } from 'react'
import { Container } from './styles'

interface IButtonProps {
  fn(): void
  children: ReactNode
}

export const Button = ({ fn, children }: IButtonProps) => {
  const handleClick = useCallback(() => {
    fn()
  }, [])

  return <Container onClick={handleClick}>{children}</Container>
}
