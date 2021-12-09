import { useEffect, useState } from 'react'
import { useSearch } from 'src/hooks/useSearch'
import { coursesService } from 'src/services/coursesService'
import PlanetGif from '../../assets/planet.gif'
import { CardTemplate } from '../../components/CardTemplate'
import { InputSearch } from './components/InputSearch'
import { Container } from './styles'

type cursoDataProps = {
  id: number
  curso: string
  edicao: number
}

const Home = () => {
  const { handleSearch } = useSearch()
  const [provas, setProvas] = useState<cursoDataProps[]>([])

  const initialize = async () => {
    try {
      const response = await coursesService.getCourses()

      const provas: cursoDataProps[] = []

      response.results.map((curso) => {
        curso.edicoes.map((edicao) => {
          provas.push({
            curso: curso.nome,
            id: curso.id,
            edicao: edicao
          })
        })
      })

      setProvas(provas)
    } catch (error) {}
  }

  useEffect(() => {
    initialize()
  }, [])

  return (
    <Container>
      <section>
        <div>
          <h1>
            Veja questões e provas <br />
            <span>do Enade!</span>
          </h1>
          <InputSearch onChange={(e) => handleSearch(e.target.value)} />
        </div>

        <img src={PlanetGif} />
      </section>
      <section className="provas">
        <h1>Provas</h1>
        <div>
          {provas?.map((data) => (
            <CardTemplate key={data.id} {...data} />
          ))}
        </div>
      </section>

      <section></section>
    </Container>
  )
}

export default Home
