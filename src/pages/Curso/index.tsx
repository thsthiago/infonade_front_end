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

type IInitialize = {
  params?: IParamsRequest
  search?: string | undefined
}

const Curso = () => {
  const [cources, setCources] = useState<ICursoResponse[]>([])
  const debounceSearch = useDebaunce({ fn: initialize, delay: 1000 })
  const [loading, setLoading] = useState(true)
  const [searchCource, setSearchCource] = useState<string | undefined>('')
  const [totalCursos, setTotalCursos] = useState<number>(0)
  const [paramsLocal, setParamsLocal] = useState<IParamsRequest>({
    'Page-Size': 7,
    'Page-Number': 0
  })

  async function initialize({ params, search = undefined }: IInitialize) {
    setSearchCource(search)
    setLoading(true)
    setTimeout(async () => {
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
      search: searchCource
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
    }, 2000)
  }, [])

  useEffect(() => {
    console.log(cources)
  }, [cources])

  return (
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
        {cources.map((curse) => (
          <CardEditableCurse key={curse.id} {...curse} />
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
  )
}

export default Curso
