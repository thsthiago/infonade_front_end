import ContentLoader from 'react-content-loader'
import { Container } from './styles'

export const CardLoading = ({ speed = 1 }: { speed?: number }) => {
  return (
    <Container>
      <ContentLoader
        speed={speed}
        viewBox="0 0 400 100"
        backgroundColor="#e8e8e8"
        foregroundColor="#d6d6d6">
        <rect x="4" y="6" rx="2" ry="2" width="390" height="20" />
        <rect x="4" y="30" rx="8" ry="8" width="60" height="15" />
        <rect x="70" y="30" rx="8" ry="8" width="60" height="15" />
        <rect x="135" y="30" rx="8" ry="8" width="60" height="15" />
        <rect x="200" y="30" rx="8" ry="8" width="55" height="15" />
        <rect x="260" y="30" rx="8" ry="8" width="65" height="15" />
        <rect x="330" y="30" rx="8" ry="8" width="65" height="15" />
        <rect x="4" y="50" rx="0" ry="0" width="40" height="15" />
        <rect x="50" y="50" rx="0" ry="0" width="40" height="15" />
        <rect x="95" y="50" rx="0" ry="0" width="40" height="15" />
        <rect x="4" y="70" rx="2" ry="2" width="55" height="24" />
        <rect x="338" y="70" rx="2" ry="2" width="55" height="24" />
      </ContentLoader>
    </Container>
  )
}
