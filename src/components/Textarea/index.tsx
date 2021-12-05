import { useField } from '@unform/core'
import { TextareaHTMLAttributes, useEffect, useRef } from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import { Container, Error } from './styles'

interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
}

export const Textarea = ({ name, ...rest }: ITextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { fieldName, defaultValue, error, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef.current,
      path: 'value'
    })
  }, [])

  return (
    <Container>
      <textarea {...rest} ref={textareaRef} />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" />
        </Error>
      )}
    </Container>
  )
}
