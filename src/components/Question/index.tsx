import { Link } from 'react-router-dom'
import { Container } from './styles'

interface IQuestionProps {
  curso: string
  disciplinas: string[]
  enunciado: string
  numeroQuestao: number
  edicao: number
  id: number
}

export const Question = ({
  curso,
  disciplinas,
  edicao,
  enunciado,
  id,
  numeroQuestao
}: IQuestionProps) => {
  return (
    <Container>
      <Link to="/">
        <div>
          <h1>{curso}</h1>
          <strong>Questão {numeroQuestao}</strong>
        </div>
        <p>{enunciado}</p>
        <div>
          <div>
            {disciplinas.map((disciplina) => (
              <p key={disciplina}>{disciplina}</p>
            ))}
          </div>

          <strong>Edição {edicao}</strong>
        </div>
      </Link>
    </Container>
  )
}
