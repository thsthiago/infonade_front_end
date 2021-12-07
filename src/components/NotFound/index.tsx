import { Container } from './styles'

export const NotFound = ({ name }: { name: string }) => (
  <Container className="notFound">Não foi encontrado {name}</Container>
)
