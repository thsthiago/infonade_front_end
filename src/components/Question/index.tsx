import { Link } from 'react-router-dom'
import { IQuestionDescription } from '../../interfaces/IQuestion'
import { Container } from './styles'

export const Question = ({
  curso,
  disciplinas,
  edicao,
  enunciado,
  id,
  numeroQuestao
}: IQuestionDescription) => {
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
