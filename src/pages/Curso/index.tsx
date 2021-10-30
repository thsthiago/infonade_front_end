import { CardEditable } from '../../components/CardEditable'
import { Search } from '../../components/Search'
import { Container } from './styles'

const Curso = () => {
  return (
    <Container>
      <Search
        placeholder="Digite o nome do curso"
        name="curso"
        handleSubmit={(e: any) => console.log(e)}
      />

      <div>
        <CardEditable
          id={2}
          name="curso"
          value="Análise e desenvolvimento de sistemas"
        />

        <CardEditable
          id={4}
          name="curso"
          value="Análise e desenvolvimento de sistemas"
        />

        <CardEditable
          id={5}
          name="curso"
          value="Análise e desenvolvimento de sistemas"
        />
      </div>
    </Container>
  )
}

export default Curso
