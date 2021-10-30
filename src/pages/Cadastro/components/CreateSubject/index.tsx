import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { useCallback, useRef } from 'react'
import { SelectDefault } from '../../../../components/Selects/SelectDefault'
import { usePopup } from '../../../../hooks/usePopup'
import getValidationErrors from '../../../../utils/getValidationErrors'
import { Button } from '../../../../components/Button'
import { Container } from './styles'
import { SelectCreate } from '../../../../components/Selects/SelectCreate'

export const CreateSubject = () => {
  const formRef = useRef<FormHandles>(null)
  const { addPopup } = usePopup()
  const mockCursos: any = [
    {
      value: 'Ciência da computação',
      label: 'Ciência da computação'
    },
    {
      value: 'Análise e Desenvolvimento de Sistemas',
      label: 'Análise e Desenvolvimento de Sistemas'
    }
  ]

  const mockDisciplinas: any = [
    {
      value: 'Engenharia de software',
      label: 'Engenharia de software'
    },
    {
      value: 'Programação web',
      label: 'Programação web'
    },
    {
      value: 'Cliente/Servidor',
      label: 'Cliente/Servidor'
    }
  ]

  const pesquisaTeste = (value: string): any => {
    return mockDisciplinas.filter(
      (disciplina: { label: string; value: number }) =>
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
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        curso: Yup.object()
          .shape({
            label: Yup.string().required('Curso obrigatório'),
            value: Yup.string()
          })
          .strict()
          .required('Curso obrigatório'),
        disciplinas: Yup.array()
          .min(1, 'Crie ou selecione pelo menos 1 disciplina')
          .of(Yup.string().required())
      })

      await schema.validate(data, {
        abortEarly: false
      })

      addPopup({
        type: 'success',
        title: 'Disciplina criada com successo.'
      })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors)
      }

      addPopup({
        type: 'error',
        title: 'Desculpe, ocorreu algum erro :(',
        description: 'Entre em contato com o administrador.'
      })
    }
  }, [])

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <SelectDefault
          name="curso"
          handleSearch={handleSearch}
          isLoadingMessage="Procurando curso..."
          placeholder="Selecione uma curso"
          messageNoOptions="Nenhum curso encontrado"
          options={mockCursos}
        />

        <SelectCreate
          name="disciplinas"
          handleSearch={handleSearch}
          isLoadingMessage="Procurando disciplina..."
          placeholder="Crie ou selecione uma disciplina"
          options={mockDisciplinas}
        />

        <Button color="primary" type="submit">
          Criar disciplina
        </Button>
      </Form>
    </Container>
  )
}
