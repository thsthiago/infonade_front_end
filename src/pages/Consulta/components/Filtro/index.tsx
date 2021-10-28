import { FormHandles } from '@unform/core'
import { useCallback, useRef, useState } from 'react'
import { AiFillCloseSquare } from 'react-icons/ai'
import { Select } from '../../../../components/Selects/Select'
import { SelectDefault } from '../../../../components/Selects/SelectDefault'
import { usePopup } from '../../../../hooks/usePopup'

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
  const formRef = useRef<FormHandles>(null)
  const { addPopup } = usePopup()

  const handleTypeQuestion = (value: string) => {
    setTypeQuestion((state) => {
      return state === value ? '' : value
    })
  }

  const pesquisaTeste = (value: string): any => {
    return mockCursos.filter((disciplina: { label: string; value: number }) =>
      disciplina.label.toLowerCase().includes(value.toLowerCase())
    )
  }

  const handleSearch: any = async (value: string) =>
    new Promise<any[]>((resolve) => {
      setTimeout(() => {
        resolve(pesquisaTeste(value))
      }, 1000)
    })

  const handleSubmit = useCallback(async (data) => {
    try {
      console.log(data)
    } catch (err) {
      addPopup({
        type: 'error',
        title: 'Desculpe, ocorreu algum erro :(',
        description: 'Entre em contato com o administrador.'
      })
    }
  }, [])

  return open ? (
    <Container
      ref={formRef}
      onSubmit={handleSubmit}
      typeQuestion={typeQuestion}>
      <div>
        <h1>Filtros</h1>
        <button onClick={() => setIsOpen(false)}>
          <AiFillCloseSquare size={33} />
        </button>
      </div>

      <div>
        <strong>Cursos</strong>
        <SelectDefault
          name="curso"
          handleSearch={handleSearch}
          isLoadingMessage="Procurando curso..."
          placeholder="Selecione uma curso"
          messageNoOptions="Nenhum curso encontrado"
        />
      </div>
      <div>
        <strong>Disciplina</strong>
        <SelectDefault
          name="disciplinas"
          handleSearch={handleSearch}
          isLoadingMessage="Procurando disciplina..."
          placeholder="Selecione uma disciplina"
          messageNoOptions="Nenhuma disciplina encontrada"
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
          <button
            onClick={() => handleTypeQuestion('dissertativa')}
            type="button">
            Dissertativa
          </button>
          <button
            onClick={() => handleTypeQuestion('alternativa')}
            type="button">
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
