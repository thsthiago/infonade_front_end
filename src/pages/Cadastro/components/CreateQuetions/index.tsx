import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useCallback, useRef, useState } from 'react'
import { usePopup } from '../../../../hooks/usePopup'
import { Container } from './styles'
import * as Yup from 'yup'
import getValidationErrors from '../../../../utils/getValidationErrors'
import { SelectDefault } from '../../../../components/Selects/SelectDefault'
import { FormQuestion } from './components/FormQuestion'

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

export const CreateQuestions = () => {
  const formRef = useRef<FormHandles>(null)
  const { addPopup } = usePopup()
  const [questions, setQuestions] = useState<number[]>([0])

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
        curso: Yup.string().required('Nome do curso obrigatório')
      })

      await schema.validate(data, {
        abortEarly: false
      })

      addPopup({
        type: 'success',
        title: 'Curso criado com sucesso!'
      })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)
      }
    }
  }, [])

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <SelectDefault
          name="curso"
          handleSearch={handleSearch}
          isLoadingMessage="Procurando curso..."
          messageNoOptions="Curso não encontrado"
          placeholder="Selecione um curso"
        />
        <SelectDefault
          name="edicao"
          handleSearch={handleSearch}
          isLoadingMessage="Procurando edicão..."
          messageNoOptions="Edição não encontrada"
          placeholder="Selecione uma edicão"
        />
        <h1>Questão(ões)</h1>
        <div>
          {questions.map((question) => (
            <FormQuestion key={question} />
          ))}
        </div>
      </Form>
    </Container>
  )
}
