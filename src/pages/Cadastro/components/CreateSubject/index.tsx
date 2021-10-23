import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { useCallback, useRef, useState } from 'react'
import { SelectDefault } from '../../../../components/Selects/SelectDefault'
import { usePopup } from '../../../../hooks/usePopup'
import getValidationErrors from '../../../../utils/getValidationErrors'
import { Button } from '../../../../components/Button'
import { Container } from './styles'

export const CreateSubject = () => {
  const formRef = useRef<FormHandles>(null)
  const { addPopup } = usePopup()
  const mockOption: any = [
    {
      value: 0,
      label: 'Ciência da computação'
    },
    {
      value: 1,
      label: 'Análise e Desenvolvimento de Sistemas'
    }
  ]

  const handleSubmit = useCallback(async (data) => {
    try {
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        curso: Yup.object()
          .shape({
            label: Yup.string(),
            value: Yup.number()
          })
          .required('Curso obrigatório')
      })

      await schema.validate(data, {
        abortEarly: false
      })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors)
        console.log(errors)
      }
    }
  }, [])

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <SelectDefault
          name="curso"
          placeholder="Selecione uma curso"
          options={mockOption}
        />
        <Button color="primary" type="submit">
          Criar disciplina
        </Button>
      </Form>
    </Container>
  )
}
