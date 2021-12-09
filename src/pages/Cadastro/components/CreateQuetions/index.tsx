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
import { Textarea } from 'src/components/Textarea'
import { coursesService } from 'src/services/coursesService'
import { useDebaunceSelect } from 'src/hooks/useDebaunce'
import { subjectsService } from 'src/services/subjectsService'
import { questionsService } from 'src/services/questionsService'
import { handleNumberSelect } from 'src/utils/listNumbers'

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
  const [isDisabled, setIsDisabled] = useState(true)
  const [loading, setLoading] = useState<boolean>(false)
  const { addPopup } = usePopup()
  const [courses, setCources] = useState([])
  const [edicoes, setEdicoes] = useState([])
  const [disciplinas, setDisciplinas] = useState([])
  const [typeQuestion, setTypeQuestion] = useState<
    'alternativa' | 'dissertativa'
  >('alternativa')
  const debounceCurse = useDebaunceSelect({
    fn: coursesService.getCourses,
    delay: 500
  })

  const handleSearchCourse = async (search: string) => {
    try {
      const response: any = await debounceCurse({
        header: {
          'Page-Size': 10,
          'Page-Number': 0
        },
        params: {
          nome: search === '' ? undefined : search
        }
      })
      setCources(response.results)

      const courcesFormat = response.results.map((curse: any) => {
        return {
          value: curse.id,
          label: curse.nome
        }
      })

      return courcesFormat
    } catch (err) {}
  }

  const searchSubjects = async (id: number) => {
    try {
      const response = await subjectsService.getSubjects({
        params: { curso: id }
      })

      const subjectsFormt: any = response.results.map((subject: any) => {
        return {
          value: subject.id,
          label: subject.nome
        }
      })

      setDisciplinas(subjectsFormt)
    } catch (err) {}
  }

  const onChangeCurse = (e: any) => {
    formRef?.current?.setFieldValue('edicao', '')
    formRef?.current?.setFieldValue('disciplinas', '')
    const cource: any = courses.find((item: any) => item.id === e.value)
    searchSubjects(e.value)

    const courcesEditions = cource?.edicoes?.map((edicao: number) => {
      return {
        value: edicao,
        label: edicao
      }
    })

    setEdicoes(courcesEditions)
    setIsDisabled(false)
  }

  const formatData = (data: any) => {
    const disciplina = data.disciplinas.map((disciplinaItem: any) => {
      return {
        id: disciplinaItem
      }
    })

    const alternativas = data.alternativas.map((alternativa: any) => {
      if (
        typeQuestion === 'dissertativa' &&
        typeof alternativa.enunciado !== 'string'
      ) {
        return
      }
      return {
        enunciado: alternativa.enunciado,
        letra: alternativa.letra
      }
    })

    return {
      tipoQuestao: data.type.label,
      numQuestao: data.numeroQuestao,
      edicao: data.edicao.value,
      enunciado: data.enunciado,
      resposta:
        typeQuestion === 'alternativa'
          ? data.resposta
          : JSON.stringify(
              alternativas.filter((alternativa: any) => alternativa)
            ),
      alternativas: typeQuestion === 'alternativa' ? alternativas : undefined,
      anotacoes: [
        {
          anotacao: data.anotacao,
          createdAt: new Date().toISOString()
        }
      ],
      curso: {
        id: data.curso.value
      },
      disciplina
    }
  }

  const resetForm = () => {
    formRef.current?.setFieldValue('disciplinas', '')
    formRef.current?.clearField('tipoQuestao')
    formRef.current?.clearField('numeroQuestao')
    formRef.current?.setFieldValue('enunciado', '')
    formRef.current?.clearField('anotacao')
    formRef.current?.setFieldValue('letraA', '')
    formRef.current?.setFieldValue('letraB', '')
    formRef.current?.setFieldValue('letraC', '')
    formRef.current?.setFieldValue('letraD', '')
    formRef.current?.setFieldValue('letraE', '')
  }

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

        let resposta

        const alternativas = [
          data.letraA,
          data.letraB,
          data.letraC,
          data.letraD,
          data.letraE
        ]

        const validate = alternativas.every((alternativa) => {
          if (alternativa.correta === 'SIM') {
            resposta = alternativa.letra
            return false
          }
          return true
        })

        if (validate && typeQuestion === 'alternativa') {
          throw new Error('Selecione uma alternativa')
        }

        const response = formatData({ ...data, alternativas, resposta })

        await questionsService.addQuestion(response)

        resetForm()
        addPopup({
          type: 'success',
          title: 'Questão criada com sucesso!'
        })
      } catch (err: any) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
          return
        }

        if (err.message === 'Selecione uma alternativa') {
          formRef?.current?.setErrors({
            letraA: 'Selecione uma alternativa',
            letraB: 'Selecione uma alternativa',
            letraC: 'Selecione uma alternativa',
            letraD: 'Selecione uma alternativa',
            letraE: 'Selecione uma alternativa'
          })
          return
        }

        addPopup({
          type: 'error',
          title: 'Ocorreu um erro'
        })
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
          handleSearch={handleSearchCourse}
          isLoadingMessage="Procurando curso..."
          messageNoOptions="Curso não encontrado"
          placeholder="Selecione um curso"
          onChange={onChangeCurse}
        />
        <Select
          isDisabled={isDisabled}
          name="edicao"
          options={edicoes}
          optionsMessage="Edição não encontrada"
          placeholder={
            isDisabled
              ? 'Para selecionar a edição, escolha um curso'
              : 'Selecione a edicão'
          }
        />
        <h1>Questão</h1>
        <Box>
          <Select
            isDisabled={isDisabled}
            isMulti
            optionsMessage="Disciplina não encontrada"
            options={disciplinas}
            name="disciplinas"
            placeholder={
              isDisabled
                ? 'Para selecionar as disciplinas, escolha um curso'
                : 'Selecione uma ou mais disciplinas'
            }
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
          <Input
            name="numeroQuestao"
            placeholder="Número da questão"
            type="number"
          />
          <Editor name="enunciado" />
          <TypeQuestion type={typeQuestion} />
        </Box>
        <Textarea placeholder="Anotação (opcional)" name="anotacao" />
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
