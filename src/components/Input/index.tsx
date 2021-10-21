import { useField } from '@unform/core'
import { InputHTMLAttributes, useEffect, useRef } from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import { Container, Error } from './styles'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export const Input = ({ name, ...rest }: IInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const { fieldName, defaultValue, error, registerField } = useField(name)

  useEffect(() => {
    console.log(name)

    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [])

  return (
    <Container isErrored={!!error}>
      <input ref={inputRef} defaultValue={defaultValue} {...rest} />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" />
        </Error>
      )}
    </Container>
  )
}
