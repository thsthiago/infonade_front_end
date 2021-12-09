import { useEffect, useState } from 'react'
import { LinearProgress } from 'src/components/LinearProgress'
import { Observer } from 'src/components/Observer'
import { useDebaunce } from 'src/hooks/useDebaunce'
import { ICursoResponse } from 'src/interfaces/ICurso'
import { IParamsRequest } from 'src/interfaces/IParams'
import { coursesService } from 'src/services/coursesService'
import { Search } from '../../components/Search'
import { CardEditableCurse } from './components/CardEditableCurse'
import { CardLoading } from './components/CardLoading'
import { Container } from './styles'
import { NotFound } from 'src/components/NotFound'
import { Modal } from 'src/components/Modal'

type IInitialize = {
  params?: IParamsRequest
  search?: string | undefined
}

export type IModalDelete = {
  isOpen: boolean
  fn: any
}

const Curso = () => {
  const [cources, setCources] = useState<ICursoResponse[]>([])
  const debounceSearch = useDebaunce({ fn: initialize, delay: 1000 })
  const [loading, setLoading] = useState(true)
  const [searchCource, setSearchCource] = useState<string | undefined>('')
  const [totalCursos, setTotalCursos] = useState<number>(0)
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
    setSearchCource(search)
    setLoading(true)

    try {
      const response = await coursesService.getCourses({
        header: { ...params },
        params: {
          nome: search === '' ? undefined : search
        }
      })
      setTotalCursos(response.count)
      setCources(response.results)
    } catch (err) {
    } finally {
      setVerify(true)
      setLoading(false)
    }
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
      search: searchCource
    })

    setParamsLocal((state) => {
      return {
        'Page-Number': 0,
        'Page-Size': state['Page-Size'] + 7
      }
    })
  }

  const refresh = () => {
    setCources([])
    setSearchCource('')
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
    }, 2000)
  }, [])

  return (
    <>
      <Container>
        {loading && <LinearProgress />}
        <Search
          placeholder="Digite o nome do curso"
          name="curso"
          onChange={(e) => handleSearch(e.target.value)}
        />
        {cources.length !== 0 && (
          <p>
            Foi encotrado {totalCursos} {totalCursos > 1 ? 'cursos' : 'curso'}
          </p>
        )}

        <div>
          {verify && totalCursos === 0 && !loading && (
            <NotFound name="nenhum curso" />
          )}

          {cources.map((curse) => (
            <CardEditableCurse
              refresh={refresh}
              handleDelete={setModalIsOpen}
              key={curse.id}
              {...curse}
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

        {cources.length !== 0 && cources.length !== totalCursos && !loading && (
          <Observer callback={() => handlePageSize()} />
        )}
      </Container>
      <Modal
        setIsOpen={setModalIsOpen}
        isOpen={modalIsOpen.isOpen}
        confirm={modalIsOpen.fn}
        name="esse curso"
      />
    </>
  )
}

export default Curso
