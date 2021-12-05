import ContentLoader from 'react-content-loader'
import { Container } from './styles'

export const CardLoading = ({ speed = 1 }: { speed?: number }) => {
  return (
    <Container>
      <ContentLoader
        speed={speed}
        viewBox="0 0 400 60"
        backgroundColor="#e8e8e8"
        foregroundColor="#d6d6d6">
        <rect x="4" y="6" rx="2" ry="2" width="390" height="20" />
        <rect x="4" y="30" rx="2" ry="2" width="55" height="24" />
        <rect x="338" y="30" rx="2" ry="2" width="55" height="24" />
      </ContentLoader>
    </Container>
  )
}
