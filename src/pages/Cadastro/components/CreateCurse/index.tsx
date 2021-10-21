import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useCallback, useRef } from 'react'
import { Input } from '../../../../components/Input'
import { Container } from './styles'
import * as Yup from 'yup'
import getValidationErrors from '../../../../utils/getValidationErrors'
import { Button } from '../../../../components/Button'
import { usePopup } from '../../../../hooks/usePopup'

export const CreateCurse = () => {
  const formRef = useRef<FormHandles>(null)
  const { addPopup } = usePopup()

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
        <Input name="curso" placeholder="Digite um curso" />
        <Button type="submit" color="primary">
          Criar curso
        </Button>
      </Form>
    </Container>
  )
}
