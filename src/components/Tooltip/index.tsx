import React from 'react'
import { Container } from './styles'

interface TooltipProps {
  title: string
  className?: string
  type?: boolean
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  className,
  children,
  type
}) => {
  return (
    <Container className={className} type={type}>
      {children}
      <span>{title}</span>
    </Container>
  )
}

export default Tooltip
