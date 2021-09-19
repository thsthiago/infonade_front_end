import { Container } from './styles'

type CardTemplateProps = {
  curso: string
  edicao: number
  gabarito?: boolean
}

export const CardTemplate = ({
  gabarito,
  curso,
  edicao
}: CardTemplateProps) => {
  return (
    <Container to={`/${gabarito && gabarito}/${curso}/${edicao}`}>
      <div>
        <h1>{curso}</h1>
      </div>
      <strong>Edição: {edicao}</strong>
    </Container>
  )
}
