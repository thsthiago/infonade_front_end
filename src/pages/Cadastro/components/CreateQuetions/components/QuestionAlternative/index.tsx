import { useEffect, useRef, useState } from 'react'
import { useField } from '@unform/core'
import { FiAlertCircle } from 'react-icons/fi'
import { Container, Error } from './styles'

interface IRadioQuestion {
  value: string
  name: string
  letra: string
  nameRadio: string
}

export const QuestionAlternative = ({
  letra,
  nameRadio,
  name,
  value
}: IRadioQuestion) => {
  const [alternativaState, setAlternativaState] = useState<string>('')
  const enunciadoRef = useRef<any>(null)
  const radioRef = useRef<any>(null)
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
          correta: radioRef.current?.checked ? 'SIM' : 'NÃO',
          letra: value,
          enunciado: alternativaState
        }
      },
      setValue: (props: any) => {
        radioRef.current.checked = false
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
        <input type="radio" name={nameRadio} ref={radioRef} />
        <strong>{letra.toUpperCase()}</strong>
      </label>

      <input
        name={name}
        placeholder="Alternativa"
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
