import { useEffect, useState } from 'react'
import { LinearProgress } from 'src/components/LinearProgress'
import { Modal } from 'src/components/Modal'
import { NotFound } from 'src/components/NotFound'
import { Observer } from 'src/components/Observer'
import { Search } from 'src/components/Search'
import { useDebaunce } from 'src/hooks/useDebaunce'
import { IDisciplinaResponse } from 'src/interfaces/IDisciplina'
import { IParamsRequest } from 'src/interfaces/IParams'
import { subjectsService } from 'src/services/subjectsService'
import { CardEditableSubject } from './components/CardEditableDisciplina'
import { CardLoading } from './components/CardLoading'
import { Container } from './styles'

type IInitialize = {
  params?: IParamsRequest
  search?: string | undefined
}

export type IModalDelete = {
  isOpen: boolean
  fn: any
}

const Disciplina = () => {
  const [disciplinas, setDisciplina] = useState<IDisciplinaResponse[]>([])
  const debounceSearch = useDebaunce({ fn: initialize, delay: 1000 })
  const [loading, setLoading] = useState(true)
  const [searchSubjects, setSearchSubjects] = useState<string | undefined>('')
  const [totalDisciplinas, setTotalDisciplinas] = useState<number>(0)
  const [verify, setVerify] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState<IModalDelete>({
    isOpen: false,
    fn: undefined
  })
  const [paramsLocal, setParamsLocal] = useState<IParamsRequest>({
    'Page-Size': 7,
    'Page-Number': 0
  })

  async function initialize({ params, search = undefined }: IInitialize) {
    setSearchSubjects(search)
    setLoading(true)
    setTimeout(async () => {
      try {
        const response = await subjectsService.getSubjects({
          header: { ...params },
          params: {
            nome: search === '' ? undefined : search
          }
        })

        setTotalDisciplinas(response.count)
        setDisciplina(response.results)
      } catch (err) {
      } finally {
        setLoading(false)
        setVerify(true)
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
      search: searchSubjects
    })

    setParamsLocal((state) => {
      return {
        'Page-Number': 0,
        'Page-Size': state['Page-Size'] + 7
      }
    })
  }

  const refresh = () => {
    setDisciplina([])
    setSearchSubjects('')
    initialize({
      params: {
        'Page-Number': 0,
        'Page-Size': 7
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
      <Container>
        {loading && <LinearProgress />}
        <Search
          placeholder="Digite o nome da disciplina"
          name="disciplina"
          onChange={(e) => handleSearch(e.target.value)}
        />
        {disciplinas.length !== 0 && (
          <p>
            Foi encotrado {totalDisciplinas}{' '}
            {totalDisciplinas > 1 ? 'disciplinas' : 'disciplina'}
          </p>
        )}

        <div>
          {verify && totalDisciplinas === 0 && !loading && (
            <NotFound name="nenhuma disciplina" />
          )}

          {disciplinas.map((disciplina) => (
            <CardEditableSubject
              refresh={refresh}
              key={disciplina.id}
              handleDelete={setModalIsOpen}
              {...disciplina}
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

        {disciplinas.length !== 0 &&
          disciplinas.length !== totalDisciplinas &&
          !loading && <Observer callback={() => handlePageSize()} />}
      </Container>
      <Modal
        setIsOpen={setModalIsOpen}
        isOpen={modalIsOpen.isOpen}
        confirm={modalIsOpen.fn}
        name="essa disciplina"
      />
    </>
  )
}

export default Disciplina
