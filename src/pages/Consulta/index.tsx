import { useEffect, useState } from 'react'
import { questionsService } from 'src/services/questionsService'
import { Button } from '../../components/Button'
import { Question } from '../../components/Question'
import { Search } from '../../components/Search'
import { IQuestionResponse } from '../../interfaces/IQuestion'
import { Filtro } from './components/Filtro'
import { Container } from './styles'
import { CardLoading } from '../Curso/components/CardLoading'
import { IParamsRequest } from 'src/interfaces/IParams'
import { Observer } from 'src/components/Observer'
import { useDebaunce } from 'src/hooks/useDebaunce'
import { NotFound } from 'src/components/NotFound'
import { LinearProgress } from 'src/components/LinearProgress'
import { useSearch } from 'src/hooks/useSearch'

type IInitialize = {
  params?: IParamsRequest
  search?: string | undefined
}

export type IFilter = {
  teste: number | undefined
  disciplina: number | undefined
  tipoQuestao: 'Alternativa' | 'Dissertativa' | undefined
  edicao: number | undefined
  numeroQuestao: number | undefined
}

const Consulta = () => {
  const { searchGlobal, clear } = useSearch()
  const [questions, setQuestions] = useState<IQuestionResponse[]>([])
  const debounceSearch = useDebaunce({ fn: initialize, delay: 1000 })
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)
  const [searchQuestion, setSearchQuestion] = useState<string | undefined>(
    searchGlobal
  )
  const [totalQuestoes, setTotalQuestoes] = useState<number>(0)
  const [verify, setVerify] = useState(false)
  const [filter, setFilter] = useState<IFilter>({
    teste: undefined,
    disciplina: undefined,
    edicao: undefined,
    numeroQuestao: undefined,
    tipoQuestao: undefined
  })

  const [paramsLocal, setParamsLocal] = useState<IParamsRequest>({
    'Page-Size': 7,
    'Page-Number': 0
  })

  const handleFilter = (params: IFilter) => {
    setFilter(filter)
    handleToggleFilter()
    setLoading(true)
    setTimeout(async () => {
      try {
        const response = await questionsService.getQuestions({
          header: { ...params },
          params
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

  async function initialize({ params, search = undefined }: IInitialize) {
    setSearchQuestion(search)
    setLoading(true)
    setTimeout(async () => {
      try {
        const response = await questionsService.getQuestions({
          header: { ...params },
          params: {
            search: search === '' ? undefined : search,
            curso: search === '' ? undefined : search
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

  const handleSearch = (e: string) => {
    setParamsLocal({
      'Page-Number': 0,
      'Page-Size': 7
    })
    debounceSearch({
      params: {
        'Page-Number': 0,
        'Page-Size': 7
      },
      search: e
    })
  }

  const handlePageSize = () => {
    initialize({
      params: {
        'Page-Number': 0,
        'Page-Size': paramsLocal['Page-Size'] + 7
      },
      search: searchQuestion
    })

    setParamsLocal((state) => {
      return {
        'Page-Number': 0,
        'Page-Size': state['Page-Size'] + 7
      }
    })
  }

  const refresh = () => {
    setQuestions([])
    setSearchQuestion('')
    initialize({
      params: {
        'Page-Number': 0,
        'Page-Size': 7
      }
    })
  }

  const handleClear = () => {
    setFilter({
      disciplina: undefined,
      edicao: undefined,
      numeroQuestao: undefined,
      teste: undefined,
      tipoQuestao: undefined
    })

    initialize({
      params: {
        'Page-Number': 0,
        'Page-Size': 7
      },
      search: searchQuestion
    })

    setParamsLocal((state) => {
      return {
        'Page-Number': 0,
        'Page-Size': 7
      }
    })
  }

  useEffect(() => {
    setTimeout(() => {
      initialize({
        params: paramsLocal,
        search: searchGlobal
      })
      handleClear()
    }, 2000)

    return () => clear()
  }, [])

  const handleToggleFilter = (value?: boolean): void => {
    setIsOpenFilter((props) => value || !props)
  }

  return (
    <>
      {loading && <LinearProgress />}
      <Container>
        <div>
          <Button onClick={() => handleToggleFilter()} color="secondary">
            Filtro
          </Button>
          <Search
            defaultValue={searchGlobal}
            placeholder="Pesquise por disciplina"
            name="questao"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Filtro
            open={isOpenFilter}
            setIsOpen={handleToggleFilter}
            filter={handleFilter}
          />
        </div>
        <div className="clearFilter">
          {questions.length !== 0 && (
            <p>
              Foi encotrado {totalQuestoes}{' '}
              {totalQuestoes > 1 ? 'quest??es' : 'quest??o'}
            </p>
          )}

          <button className="clear" onClick={handleClear}>
            Limpar filtro
          </button>
        </div>
        <div>
          {verify && totalQuestoes === 0 && !loading && (
            <NotFound name="nenhuma quest??o" />
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

export default Consulta
