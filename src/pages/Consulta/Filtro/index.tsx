import { useState } from 'react'
import { AiFillCloseSquare } from 'react-icons/ai'
import { Select } from '../../../components/Selects/Select'
import { Container } from './styles'

const mockCursos = [
  {
    value: 0,
    label: 'teste 1'
  },
  {
    value: 1,
    label: 'teste 1'
  },
  {
    value: 2,
    label: 'teste 1'
  }
]

const mockDisciplina = [
  {
    value: 0,
    label: 'Programação web'
  },
  {
    value: 1,
    label: 'Client/Servidor'
  }
]

const mockEdicao = [
  {
    value: 0,
    label: '2021'
  },
  {
    value: 1,
    label: '2007'
  }
]

const mockQuestao = [
  {
    value: 1,
    label: '1'
  },
  {
    value: 2,
    label: '2'
  },
  {
    value: 3,
    label: '3'
  },
  {
    value: 4,
    label: '4'
  }
]

interface IFiltroProps {
  open: boolean
  setIsOpen(value: boolean): void
}

export const Filtro = ({ open, setIsOpen }: IFiltroProps) => {
  const [typeQuestion, setTypeQuestion] = useState<string>('')

  const handleTypeQuestion = (value: string) => {
    setTypeQuestion((state) => {
      return state === value ? '' : value
    })
  }

  return open ? (
    <Container typeQuestion={typeQuestion}>
      <div>
        <h1>Filtros</h1>
        <button onClick={() => setIsOpen(false)}>
          <AiFillCloseSquare size={33} />
        </button>
      </div>

      <div>
        <strong>Cursos</strong>
        <Select
          name="cursos"
          options={mockCursos}
          optionsMessage="Curso não encontrado"
        />
      </div>
      <div>
        <strong>Disciplina</strong>
        <Select
          name="disciplina"
          options={mockDisciplina}
          optionsMessage="Disciplina não encontrada"
        />
      </div>
      <div>
        <strong>Edição</strong>
        <Select
          name="edicao"
          options={mockEdicao}
          optionsMessage="Edição não encontrada"
        />
      </div>
      <div>
        <strong>Número da questão</strong>
        <Select
          name="questao"
          options={mockQuestao}
          optionsMessage="Questão não encontrada"
        />
      </div>
      <div>
        <strong>Tipo da questão</strong>
        <div>
          <button onClick={() => handleTypeQuestion('dissertativa')}>
            Dissertativa
          </button>
          <button onClick={() => handleTypeQuestion('alternativa')}>
            Alternativa
          </button>
        </div>
      </div>
      <button>Filtrar</button>
    </Container>
  ) : (
    <></>
  )
}
