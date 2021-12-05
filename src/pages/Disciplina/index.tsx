import { useEffect, useState } from 'react'
import { CardEditable } from 'src/components/CardEditable'
import { Search } from 'src/components/Search'
import { IDisciplina } from 'src/interfaces/IDisciplina'
import { subjectsService } from 'src/services/subjectsService'
import { Container } from './styles'

const Disciplina = () => {
  const [disciplinas, setDisciplina] = useState<IDisciplina[]>([])

  const initialize = async () => {
    try {
      const response = await subjectsService.getSubjects()
      setDisciplina(response)
    } catch (err) {}
  }

  useEffect(() => {
    initialize()
  }, [])

  return (
    <Container>
      <Search
        placeholder="Digite o nome da disciplina"
        name="disciplina"
        handleSubmit={(e: any) => console.log(e)}
      />

      <div>
        {disciplinas.map((disciplina) => (
          <CardEditable
            key={disciplina.id}
            id={disciplina.id}
            name="disciplina"
            value={disciplina.nome}
          />
        ))}
      </div>
    </Container>
  )
}

export default Disciplina
