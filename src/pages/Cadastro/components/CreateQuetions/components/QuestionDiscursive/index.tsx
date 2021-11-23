import { useEffect, useRef, useState } from 'react'
import { useField } from '@unform/core'
import { FiAlertCircle } from 'react-icons/fi'
import { Container, Error } from './styles'

interface IRadioQuestion {
  letra: string
  name: string
  value: string
}

const letterDiscursive: any = {
  '0': 'A',
  '1': 'B',
  '2': 'C',
  '3': 'D',
  '4': 'E'
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
      }
    })
  }, [fieldName, registerField, alternativaState])

  const handleValue = (e: any) => {
    setAlternativaState(e.target.value)
  }

  return (
    <Container>
      <label>
        <span>{letra}</span>
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
