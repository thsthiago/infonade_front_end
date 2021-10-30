import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useCallback, useRef, useState } from 'react'
import { usePopup } from '../../../../hooks/usePopup'
import { Container } from './styles'
import * as Yup from 'yup'
import getValidationErrors from '../../../../utils/getValidationErrors'
import { SelectDefault } from '../../../../components/Selects/SelectDefault'
import { FormQuestion } from './components/FormQuestion'
import { Button } from '../../../../components/Button'

const mockDisciplinas: any = [
  {
    value: 1,
    label: 'Engenharia de software'
  },
  {
    value: 2,
    label: 'Programação web'
  },
  {
    value: 3,
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
    console.log(data)
    try {
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        curso: Yup.object().shape({
          label: Yup.string().required('Curso obrigatório'),
          value: Yup.number()
        }),
        edicao: Yup.object().shape({
          label: Yup.string().required('Edição obrigatória'),
          value: Yup.number()
        }),
        disciplinas: Yup.array()
          .min(1, 'Selecione pelo menos 1 disciplina')
          .of(Yup.string()),
        numeroQuestao: Yup.string().required('Número da questão é obrigatório'),
        enunciado: Yup.string().required('Enunciado obrigatório'),
        letraA: Yup.object().shape({
          correta: Yup.string().required(
            'Obrigatório pelo menos 1 alternativa correta'
          ),
          enunciado: Yup.string().required(
            'Enunciado da alternativa obrigatório'
          ),
          letra: Yup.string()
        }),
        letraB: Yup.object().shape({
          correta: Yup.string().required(
            'Obrigatório pelo menos 1 alternativa correta'
          ),
          enunciado: Yup.string().required(
            'Enunciado da alternativa obrigatório'
          ),
          letra: Yup.string()
        }),
        letraC: Yup.object().shape({
          correta: Yup.string().required(
            'Obrigatório pelo menos 1 alternativa correta'
          ),
          enunciado: Yup.string().required(
            'Enunciado da alternativa obrigatório'
          ),
          letra: Yup.string()
        }),
        letraD: Yup.object().shape({
          correta: Yup.string().required(
            'Obrigatório pelo menos 1 alternativa correta'
          ),
          enunciado: Yup.string().required(
            'Enunciado da alternativa obrigatório'
          ),
          letra: Yup.string()
        }),
        letraE: Yup.object().shape({
          correta: Yup.string().required(
            'Obrigatório pelo menos 1 alternativa correta'
          ),
          enunciado: Yup.string().required(
            'Enunciado da alternativa obrigatório'
          ),
          letra: Yup.string()
        })
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
        console.log(errors)
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
        <Button type="submit" color="primary">
          Enviar
        </Button>
      </Form>
    </Container>
  )
}
