import { useEffect, useState } from 'react'
import { Button } from '../../components/Button'
import { Question } from '../../components/Question'
import { Search } from '../../components/Search'
import { IQuestionDescription } from '../../interfaces/IQuestion'
import { Container } from './styles'

const Consulta = () => {
  const [questions, setQuestions] = useState<IQuestionDescription[]>([])

  useEffect(() => {
    setQuestions([
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
    ])
  }, [])

  return (
    <Container>
      <div>
        <Button fn={() => console.log('teste')} color="secondary">
          Filtro
        </Button>
        <Search />
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
