import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { useCallback, useRef, useState } from 'react'
import { SelectDefault } from '../../../../components/Selects/SelectDefault'
import { usePopup } from '../../../../hooks/usePopup'
import getValidationErrors from '../../../../utils/getValidationErrors'
import { Button } from '../../../../components/Button'
import { Container } from './styles'
import { SelectCreate } from '../../../../components/Selects/SelectCreate'
import { coursesService } from 'src/services/coursesService'
import { subjectsService } from 'src/services/subjectsService'
import { Loading } from 'src/components/Loading'
import { useDebaunceSelect } from 'src/hooks/useDebaunce'

export const CreateSubject = () => {
  const formRef = useRef<FormHandles>(null)
  const { addPopup } = usePopup()
  const [loading, setLoading] = useState<boolean>(false)
  const debounce = useDebaunceSelect({
    fn: coursesService.getCourses,
    delay: 500
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

    return courcesFormat
  }

  const handleSubmit = useCallback(async (data) => {
    try {
      setLoading(true)
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        curso: Yup.object()
          .shape({
            label: Yup.string().required('Curso obrigatório'),
            value: Yup.number()
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

      data.disciplinas.map(async (disciplina: any) => {
        try {
          await subjectsService.addSubject({
            nome: disciplina,
            curso: {
              id: data.curso.value
            }
          })
          addPopup({
            type: 'success',
            title: `${disciplina} criado com sucesso`
          })
        } catch (err) {
          addPopup({
            type: 'error',
            title: `Ocorreu um erro`,
            description: `Erro ao criar ${disciplina} :(`
          })
        }
      })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors)
        return
      }
      addPopup({
        type: 'error',
        title: 'Desculpe, ocorreu algum erro :(',
        description: 'Entre em contato com o administrador.'
      })
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <SelectDefault
          name="curso"
          handleSearch={handleSearchCourse}
          isLoadingMessage="Procurando curso..."
          placeholder="Selecione uma curso"
          messageNoOptions="Nenhum curso encontrado"
        />

        <SelectCreate
          name="disciplinas"
          placeholder="Crie uma ou mais displinas"
        />

        <Button
          color="primary"
          type="submit"
          disabled={loading}
          style={{ width: 150 }}>
          {loading ? (
            <Loading border={4} size={15} color="#ffffff" />
          ) : (
            'Criar disciplina'
          )}
        </Button>
      </Form>
    </Container>
  )
}
