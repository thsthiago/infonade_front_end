import { Container } from './styles'

type CardTemplateProps = {
  curso: string
  edicao: number
  gabarito?: boolean
  id: number
}

export const CardTemplate = ({
  gabarito,
  curso,
  edicao,
  id
}: CardTemplateProps) => {
  return (
    <Container to={`/prova/${id}/${edicao}`}>
      <div>
        <h1>{curso}</h1>
      </div>
      <strong>Edição: {edicao}</strong>
    </Container>
  )
}
