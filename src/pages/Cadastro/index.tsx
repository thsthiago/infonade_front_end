import { useState } from 'react'
import { TypeCadastro } from './components/TypeCadastro'
import { Container, Button } from './styles'

const Cadastro = () => {
  const [create, setCreate] = useState<'curso' | 'disciplina' | 'questao'>(
    'curso'
  )

  return (
    <Container>
      <div>
        <Button
          isSelect={create === 'curso'}
          onClick={() => setCreate('curso')}>
          <span />
          Curso
        </Button>
        <Button
          isSelect={create === 'disciplina'}
          onClick={() => setCreate('disciplina')}>
          <span />
          Disciplina
        </Button>
        <Button
          isSelect={create === 'questao'}
          onClick={() => setCreate('questao')}>
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
