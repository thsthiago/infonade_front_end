import { useEffect, useState } from 'react'
import { Button } from '../../components/Button'
import { Question } from '../../components/Question'
import { Search } from '../../components/Search'
import { IQuestionDescription } from '../../interfaces/IQuestion'
import { Filtro } from './components/Filtro'
import { Container } from './styles'

const mockQuestões: IQuestionDescription[] = [
  {
    curso: 'Análise e Desenvolvimento de Sistemas',
    disciplinas: ['Programação web', 'Engenharia de software'],
    edicao: 2021,
    enunciado: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus
      aperiam ipsam consequuntur ab sequi, eaque ratione necessitatibus ducimus
      inventore libero minima sapiente totam optio sed vero accusantium. Recusandae,
      placeat mollitia.`,
    id: 1,
    numeroQuestao: 1,
    type: 'alternativa'
  },
  {
    curso: 'Análise e Desenvolvimento de Sistemas',
    disciplinas: ['Programação web', 'Engenharia de software'],
    edicao: 2021,
    enunciado: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus
      aperiam ipsam consequuntur ab sequi, eaque ratione necessitatibus ducimus
      inventore libero minima sapiente totam optio sed vero accusantium. Recusandae,
      placeat mollitia.`,
    id: 2,
    numeroQuestao: 1,
    type: 'alternativa'
  },
  {
    curso: 'Análise e Desenvolvimento de Sistemas',
    disciplinas: ['Programação web', 'Engenharia de software'],
    edicao: 2021,
    enunciado: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus
      aperiam ipsam consequuntur ab sequi, eaque ratione necessitatibus ducimus
      inventore libero minima sapiente totam optio sed vero accusantium. Recusandae,
      placeat mollitia.`,
    id: 3,
    numeroQuestao: 1,
    type: 'alternativa'
  }
]

const Consulta = () => {
  const [questions, setQuestions] = useState<IQuestionDescription[]>([])
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false)

  useEffect(() => {
    setQuestions(mockQuestões)
  }, [])

  const handleToggleFilter = (value?: boolean): void => {
    setIsOpenFilter((props) => value || !props)
  }

  return (
    <Container>
      <div>
        <Button onClick={() => handleToggleFilter()} color="secondary">
          Filtro
        </Button>
        <Search />
        <Filtro open={isOpenFilter} setIsOpen={handleToggleFilter} />
      </div>
      <div>
        {questions.map((question) => (
          <Question key={question.id} {...question} />
        ))}
      </div>
    </Container>
  )
}

export default Consulta
