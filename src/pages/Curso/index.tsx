import { useEffect, useState } from 'react'
import { useDebaunce } from 'src/hooks/useDebaunce'
import { ICurso } from 'src/interfaces/ICurso'
import { coursesService } from 'src/services/coursesService'
import { CardEditable } from '../../components/CardEditable'
import { Search } from '../../components/Search'
import { CardLoading } from './components/CardLoading'
import { Container } from './styles'

const Curso = () => {
  const [cources, setCources] = useState<ICurso[]>([])
  const debounceSearch = useDebaunce({ fn: initialize, delay: 500 })

  async function initialize(search = undefined) {
    try {
      const response = await coursesService.getCourses({
        header: {
          'Page-Size': 7,
          'Page-Number': 0
        },
        params: {
          nome: search === '' ? undefined : search
        }
      })
      setCources(response)
    } catch (err) {}
  }

  useEffect(() => {
    setTimeout(initialize, 2000)
  }, [])
  return (
    <Container>
      <Search
        placeholder="Digite o nome do curso"
        name="curso"
        onChange={(e) => debounceSearch(e.target.value)}
      />

      <div style={{ marginTop: 40 }}>
        {cources.map((curse) => (
          <CardEditable
            key={curse.id}
            id={curse.id}
            name="curso"
            value={curse.nome}
          />
        ))}
      </div>
      {cources.length === 0 && (
        <>
          <CardLoading />
          <CardLoading />
          <CardLoading />
          <CardLoading />
          <CardLoading />
        </>
      )}
    </Container>
  )
}

export default Curso
