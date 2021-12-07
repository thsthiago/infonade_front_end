import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useEffect, useRef, useState } from 'react'
import { Button } from 'src/components/Button'
import { Input } from 'src/components/Input'
import { Select } from 'src/components/Selects/Select'
import { ICursoResponse } from 'src/interfaces/ICurso'
import { IDisciplinaResponse } from 'src/interfaces/IDisciplina'
import { subjectsService } from 'src/services/subjectsService'
import { Container } from './styles'

interface selectOptions {
  label: string | number
  value: string | number
}

export const CardEditableCurse = ({
  id,
  nome,
  edicoes,
  createdAt,
  updatedAt
}: ICursoResponse) => {
  const formRef = useRef<FormHandles>(null)
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const [disciplinas, setDisciplinas] = useState<IDisciplinaResponse[]>([])
  const [disciplinasSelect, setDisciplinasSelect] = useState<selectOptions[]>(
    []
  )
  const [edicoesSelect, setEdicoesSelect] = useState<selectOptions[]>([])

  const handleSubmit = (data: any) => {
    try {
      console.log(data)
    } catch (err) {}
  }

  const searchSubjects = async () => {
    try {
      const response = await subjectsService.getSubjects({
        params: {
          curso: id
        }
      })

      const disciplinaFormat = response.map((disciplina) => {
        return {
          label: disciplina.nome,
          value: disciplina.id
        }
      })

      const edicoesFormat = edicoes.map((edicao) => {
        return {
          label: edicao,
          value: edicao
        }
      })

      setEdicoesSelect(edicoesFormat)
      setDisciplinasSelect(disciplinaFormat)
      setDisciplinas(response)
    } catch (err) {}
  }

  useEffect(() => {
    searchSubjects()
  }, [])

  return (
    <Container>
      {isEditable ? (
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="curso" defaultValue={nome} />
          <Select
            className="select"
            isMulti
            options={disciplinasSelect as any}
            name="disciplinas"
            defaultValue={disciplinasSelect as any}
            optionsMessage="Disciplina não encontrada"
          />

          <Select
            className="select"
            isMulti
            options={edicoesSelect as any}
            name="edicoes"
            defaultValue={edicoesSelect as any}
            optionsMessage="Edição não encontrada"
          />

          <div>
            <Button
              type="button"
              color="delete"
              onClick={() => setIsEditable(false)}>
              Cancelar
            </Button>

            <Button type="submit" color="confirm">
              Salvar
            </Button>
          </div>
        </Form>
      ) : (
        <div>
          <p>{nome}</p>
          <div className="disciplinas">
            {disciplinas?.map((disciplina) => (
              <p>{disciplina.nome}</p>
            ))}
          </div>
          <div className="edicoes">
            {edicoes?.map((edicao) => (
              <p>{edicao}</p>
            ))}
          </div>
          <div className="boxBtn">
            <Button type="button" color="delete">
              Excluir
            </Button>

            <Button
              type="button"
              color="secondary"
              onClick={() => setIsEditable(true)}>
              Editar
            </Button>
          </div>
        </div>
      )}
    </Container>
  )
}
