import { Container } from './styles'

export interface LoadingProps {
  size: number
  border: number
  styles?: any
  color?: string
}

export const Loading = ({ size, color, border, styles }: LoadingProps) => (
  <Container color={color} size={size} border={border} style={styles} />
)
