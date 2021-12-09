import { useEffect, useState } from 'react'
import { questionsService } from 'src/services/questionsService'
import { Question } from '../../components/Question'
import { IQuestionResponse } from '../../interfaces/IQuestion'
import { Container } from './styles'
import { CardLoading } from '../Curso/components/CardLoading'
import { IParamsRequest } from 'src/interfaces/IParams'
import { Observer } from 'src/components/Observer'
import { NotFound } from 'src/components/NotFound'
import { LinearProgress } from 'src/components/LinearProgress'
import { useRouteMatch } from 'react-router'

type IInitialize = {
  params?: IParamsRequest
  search?: string | undefined
}

const Prova = () => {
  const route: any = useRouteMatch()
  const [questions, setQuestions] = useState<IQuestionResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [totalQuestoes, setTotalQuestoes] = useState<number>(0)
  const [verify, setVerify] = useState(false)
  const [paramsLocal, setParamsLocal] = useState<IParamsRequest>({
    'Page-Size': 7,
    'Page-Number': 0
  })

  async function initialize({ params, search = undefined }: IInitialize) {
    setLoading(true)
    setTimeout(async () => {
      try {
        const response = await questionsService.getQuestions({
          header: { ...params },
          params: {
            edicao: route.params?.edicao,
            teste: route.params?.id
          }
        })
        setTotalQuestoes(response.count)
        setQuestions(response.results)
      } catch (err) {
      } finally {
        setVerify(true)
        setLoading(false)
      }
    }, 1000)
  }

  const handlePageSize = () => {
    initialize({
      params: {
        'Page-Number': 0,
        'Page-Size': paramsLocal['Page-Size'] + 7
      }
    })

    setParamsLocal((state) => {
      return {
        'Page-Number': 0,
        'Page-Size': state['Page-Size'] + 7
      }
    })
  }

  useEffect(() => {
    setTimeout(() => {
      initialize({
        params: paramsLocal
      })
    }, 1000)
  }, [])

  return (
    <>
      {loading && <LinearProgress />}
      <Container>
        <div></div>
        {questions.length !== 0 && (
          <p>
            Foi encotrado {totalQuestoes}{' '}
            {totalQuestoes > 1 ? 'questões' : 'questão'}
          </p>
        )}

        <div>
          {verify && totalQuestoes === 0 && !loading && (
            <NotFound name="nenhuma questão" />
          )}

          {questions.map((question) => (
            <Question
              key={question.id}
              curso={question.curso}
              disciplina={question.disciplina}
              edicao={question.edicao}
              enunciado={question.enunciado}
              id={question.id}
              numQuestao={question.numQuestao}
              tipoQuestao={question.tipoQuestao}
            />
          ))}
          {loading && (
            <>
              <CardLoading />
              <CardLoading />
              <CardLoading />
              <CardLoading />
              <CardLoading />
            </>
          )}
        </div>

        {questions.length !== 0 &&
          questions.length !== totalQuestoes &&
          !loading && <Observer callback={() => handlePageSize()} />}
      </Container>
    </>
  )
}

export default Prova
