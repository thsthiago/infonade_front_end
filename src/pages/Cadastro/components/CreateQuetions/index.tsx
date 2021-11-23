import { useCallback, useEffect, useRef, useState } from 'react'
import { SelectDefault } from 'src/components/Selects/SelectDefault'
import { Select } from 'src/components/Selects/Select'
import { Input } from 'src/components/Input'
import { Editor } from 'src/components/Editor'
import { Button } from 'src/components/Button'
import { Container, Box, BoxBtn } from './styles'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import getValidationErrors from '../../../../utils/getValidationErrors'

import { usePopup } from '../../../../hooks/usePopup'
import { TypeQuestion } from './components/TypeQuestion'
import { Loading } from 'src/components/Loading'

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

const schemaQuestion = {
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
  enunciado: Yup.string().required('Enunciado obrigatório')
}

const schemaAlternatives = {
  letraA: Yup.object().shape({
    correta: Yup.string().required(
      'Obrigatório pelo menos 1 alternativa correta'
    ),
    enunciado: Yup.string().required('Enunciado da alternativa obrigatório'),
    letra: Yup.string()
  }),
  letraB: Yup.object().shape({
    correta: Yup.string().required(
      'Obrigatório pelo menos 1 alternativa correta'
    ),
    enunciado: Yup.string().required('Enunciado da alternativa obrigatório'),
    letra: Yup.string()
  }),
  letraC: Yup.object().shape({
    correta: Yup.string().required(
      'Obrigatório pelo menos 1 alternativa correta'
    ),
    enunciado: Yup.string().required('Enunciado da alternativa obrigatório'),
    letra: Yup.string()
  }),
  letraD: Yup.object().shape({
    correta: Yup.string().required(
      'Obrigatório pelo menos 1 alternativa correta'
    ),
    enunciado: Yup.string().required('Enunciado da alternativa obrigatório'),
    letra: Yup.string()
  }),
  letraE: Yup.object().shape({
    correta: Yup.string().required(
      'Obrigatório pelo menos 1 alternativa correta'
    ),
    enunciado: Yup.string().required('Enunciado da alternativa obrigatório'),
    letra: Yup.string()
  })
}

const schemaDiscusive = {
  letraA: Yup.object().shape({
    enunciado: Yup.string().required('Enunciado da alternativa obrigatórios'),
    letra: Yup.string()
  })
}

export const CreateQuestions = () => {
  const elementRoot = document.querySelector('#root') as Element
  const containerRef = useRef<any>(null)
  const formRef = useRef<FormHandles>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { addPopup } = usePopup()
  const [typeQuestion, setTypeQuestion] = useState<
    'alternativa' | 'dissertativa'
  >('alternativa')

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

  const handleSubmit = useCallback(
    async (data) => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})

        const schema =
          typeQuestion === 'alternativa'
            ? Yup.object().shape({
                ...schemaQuestion,
                ...schemaAlternatives
              })
            : Yup.object().shape({
                ...schemaQuestion,
                ...schemaDiscusive
              })

        await schema.validate(data, {
          abortEarly: false
        })

        await handleSearch('a')
        await handleSearch('b')

        addPopup({
          type: 'success',
          title: 'Curso criado com sucesso!'
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
        }
      } finally {
        elementRoot.scrollIntoView({ behavior: 'smooth' })
        setLoading(false)
      }
    },
    [typeQuestion]
  )

  useEffect(() => {
    formRef.current?.setErrors({})
  }, [typeQuestion])

  return (
    <Container ref={containerRef}>
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
        <h1>Questão</h1>
        <Box>
          <SelectDefault
            isMulti
            handleSearch={handleSearch}
            isLoadingMessage="Procurando disciplina..."
            messageNoOptions="Disciplina não encontrada"
            name="disciplinas"
            placeholder="Selecione uma disciplina"
          />

          <Select
            name="type"
            onChange={({ value }: any) => setTypeQuestion(value)}
            options={[
              {
                value: 'dissertativa',
                label: 'Dissertativa'
              },
              {
                value: 'alternativa',
                label: 'Alternativa'
              }
            ]}
            optionsMessage="Essa opção não existe"
            defaultValue={{
              value: 'alternativa',
              label: 'Alternativa'
            }}
          />
          <Input name="numeroQuestao" placeholder="Número da questão" />
          <Editor name="enunciado" />
          <TypeQuestion type={typeQuestion} />
        </Box>
        <BoxBtn>
          <Button type="submit" color="primary" style={{ width: 100 }}>
            {loading ? (
              <Loading border={4} size={15} color="#ffffff" />
            ) : (
              'Enviar'
            )}
          </Button>
        </BoxBtn>
      </Form>
    </Container>
  )
}
