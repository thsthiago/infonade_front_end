import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useCallback, useRef, useState } from 'react'
import { Input } from '../../../../components/Input'
import { Container } from './styles'
import * as Yup from 'yup'
import getValidationErrors from '../../../../utils/getValidationErrors'
import { Button } from '../../../../components/Button'
import { usePopup } from '../../../../hooks/usePopup'
import { coursesService } from 'src/services/coursesService'
import { Loading } from 'src/components/Loading'
import { SelectCreate } from 'src/components/Selects/SelectCreate'

export const CreateCurse = () => {
  const formRef = useRef<FormHandles>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { addPopup } = usePopup()

  const handleSubmit = useCallback(async (data) => {
    const date = new Date()
    try {
      setLoading(true)
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        curso: Yup.string().required('Nome do curso obrigatório'),
        edicoes: Yup.array()
          .min(1, 'Crie ou pelo menos uma edição')
          .of(Yup.string().required())
      })

      await schema.validate(data, {
        abortEarly: false
      })

      const validateEdition = data.edicoes.every((edicao: string) => {
        if (Number(edicao)) {
          return Number(edicao) >= 2005 && Number(edicao) <= date.getFullYear()
        }

        return false
      })

      if (!!validateEdition === false) {
        throw new Error(
          `A edição precisa ser do ano de 2005 à ${date.getFullYear()}`
        )
      }

      await coursesService.addCourse({
        nome: data.curso,
        edicoes: data.edicoes
      })

      formRef.current?.setFieldValue('curso', '')
      addPopup({
        type: 'success',
        title: 'Curso criado com sucesso!'
      })
      formRef.current?.setFieldValue('curso', '')
      formRef.current?.setFieldValue('edicoes', '')
    } catch (err: any) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)
        return
      }

      if (
        err.message ===
        `A edição precisa ser do ano de 2005 à ${date.getFullYear()}`
      ) {
        formRef?.current?.setFieldError(
          'edicoes',
          `A edição ser do ano de 2005 à ${date.getFullYear()}`
        )
        return
      }

      addPopup({
        type: 'error',
        title: 'Ocorreu um erro',
        description: 'Erro ao criar curso'
      })
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="curso" placeholder="Digite um curso" />

        <SelectCreate name="edicoes" placeholder="Crie uma o mais edicões" />

        <Button
          type="submit"
          color="primary"
          style={{ width: 120 }}
          disabled={loading}>
          {loading ? (
            <Loading border={4} size={15} color="#ffffff" />
          ) : (
            'Criar curso'
          )}
        </Button>
      </Form>
    </Container>
  )
}
