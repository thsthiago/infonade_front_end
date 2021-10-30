import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useRef, useState } from 'react'
import { Button } from '../Button'
import { Input } from '../Input'
import { Container } from './styles'

interface ICardEditable {
  name: string
  value: string
  id: number
}

export const CardEditable = ({ name, value, id }: ICardEditable) => {
  const formRef = useRef<FormHandles>(null)
  const [isEditable, setIsEditable] = useState<boolean>(false)

  const handleSubmit = (data: any) => {
    try {
      console.log(data)
    } catch (err) {}
  }

  return (
    <Container>
      {isEditable ? (
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name={name} defaultValue={value} />
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
          <p>{value}</p>
          <div>
            <Button type="button" color="delete">
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
