import { useEffect, useRef, useState } from 'react'
import { useField } from '@unform/core'
import { FiAlertCircle } from 'react-icons/fi'
import { Container, Error } from './styles'

interface IRadioQuestion {
  letra: string
  name: string
  value: string
}

export const QuestionDiscusive = ({ letra, name, value }: IRadioQuestion) => {
  const [alternativaState, setAlternativaState] = useState<string>('')
  const enunciadoRef = useRef(null)
  const { fieldName, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: enunciadoRef.current,
      getValue: (props) => {
        if (!props.value) {
          return {}
        }

        return {
          letra: value,
          enunciado: alternativaState
        }
      },
      setValue: (props: any) => {
        setAlternativaState('')
      }
    })
  }, [fieldName, registerField, alternativaState])

  const handleValue = (e: any) => {
    setAlternativaState(e.target.value)
  }

  return (
    <Container>
      <label>
        <strong>{letra}</strong>
      </label>

      <textarea
        name={name}
        placeholder="Resposta"
        ref={enunciadoRef}
        value={alternativaState}
        onChange={handleValue}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" />
        </Error>
      )}
    </Container>
  )
}
