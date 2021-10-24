import { Container } from './styles'
import { FC } from 'react'

export interface LoadingProps {
  size: number
  border: number
  styles?: any
}

export const Loading = ({ size, border, styles }: LoadingProps) => (
  <Container size={size} border={border} style={styles} />
)
