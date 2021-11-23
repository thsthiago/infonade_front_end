import { useState } from 'react'
import { TypeCadastro } from './components/TypeCadastro'
import { Container, Button } from './styles'

const Cadastro = () => {
  const [create, setCreate] = useState<0 | 1 | 2>(0)

  return (
    <Container>
      <div>
        <Button isSelect={create === 0} onClick={() => setCreate(0)}>
          <span />
          Curso
        </Button>
        <Button isSelect={create === 1} onClick={() => setCreate(1)}>
          <span />
          Disciplina
        </Button>
        <Button isSelect={create === 2} onClick={() => setCreate(2)}>
          <span />
          Questão
        </Button>
        <span />
      </div>
      <TypeCadastro create={create} />
    </Container>
  )
}

export default Cadastro
