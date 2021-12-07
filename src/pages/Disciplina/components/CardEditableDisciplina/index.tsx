import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { FC, useRef, useState } from 'react'
import { Button } from 'src/components/Button'
import { Input } from 'src/components/Input'
import { SelectDefault } from 'src/components/Selects/SelectDefault'
import { useDebaunceSelect } from 'src/hooks/useDebaunce'
import { IDisciplinaResponse } from 'src/interfaces/IDisciplina'
import { coursesService } from 'src/services/coursesService'
import { subjectsService } from 'src/services/subjectsService'
import { Container } from './styles'
import * as Yup from 'yup'
import getValidationErrors from 'src/utils/getValidationErrors'
import { usePopup } from 'src/hooks/usePopup'

const schema = Yup.object().shape({
  disciplina: Yup.string().required('Nome da disciplina obrigatório'),
  curso: Yup.object().shape({
    label: Yup.string().required('Curso obrigatório'),
    value: Yup.number()
  })
})

interface ICardEditableSubject extends IDisciplinaResponse {
  refresh(): void
  handleDelete: any
}

export const CardEditableSubject: FC<ICardEditableSubject> = ({
  id,
  nome,
  curso,
  createdAt,
  updatedAt,
  refresh,
  handleDelete
}) => {
  const elementRoot = document.querySelector('#root') as Element
  const { addPopup } = usePopup()
  const formRef = useRef<FormHandles>(null)
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const debounce = useDebaunceSelect({
    fn: coursesService.getCourses,
    delay: 1000
  })

  const handleSearchCourse = async (search: string) => {
    const response: any = await debounce({
      header: {
        params: {
          'Page-Number': 0,
          'Page-Size': 100000
        }
      },
      params: {
        nome: search === '' ? undefined : search
      }
    })

    const courcesFormat = response.results.map((curse: any) => {
      return {
        value: curse.id,
        label: curse.nome
      }
    })

    console.log(courcesFormat)

    return courcesFormat
  }

  const handleSubmit = async (data: any) => {
    try {
      await schema.validate(data, {
        abortEarly: false
      })

      await subjectsService.updateSubject({
        id,
        nome: data.disciplina,
        curso: {
          id: data.curso.value
        },
        createdAt
      })

      addPopup({
        type: 'success',
        title: 'Disciplina atualizada com sucesso!'
      })
      setIsEditable(false)
      refresh()
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors)
      }

      addPopup({
        type: 'error',
        title: 'Ocorreu um erro',
        description: 'Erro ao atuliazar disciplina :('
      })
    }
  }

  const handleDeleteSubject = async () => {
    try {
      await subjectsService.deleteSubject(id)

      addPopup({
        type: 'success',
        title: 'Disciplina excluída com sucesso.'
      })
      refresh()

      elementRoot.scrollIntoView({ behavior: 'smooth' })
    } catch (err) {
      addPopup({
        type: 'error',
        title: 'Não foi possivél excluir a disciplina'
      })
    }
  }

  return (
    <Container>
      {isEditable ? (
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="disciplina" defaultValue={nome} />
          <SelectDefault
            className="select"
            name="curso"
            handleSearch={handleSearchCourse}
            isLoadingMessage="Procurando curso..."
            placeholder="Selecione uma curso"
            messageNoOptions="Nenhum curso encontrado"
            defaultValue={{ label: curso.nome, value: curso.id } as any}
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
          <div>
            <p className="curso">{curso.nome}</p>
          </div>
          <div className="boxBtn">
            <Button
              type="button"
              color="delete"
              onClick={() =>
                handleDelete({
                  isOpen: true,
                  fn: handleDeleteSubject
                })
              }>
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
