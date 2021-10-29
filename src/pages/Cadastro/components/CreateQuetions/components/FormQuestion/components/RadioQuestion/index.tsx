import { useField } from '@unform/core'
import { useEffect, useRef, useState } from 'react'
import { Container } from './styles'

interface IRadioQuestion {
  value: string
  name: string
  letra: string
  nameRadio: string
}

export const RadioQuestion = ({
  letra,
  nameRadio,
  name,
  value
}: IRadioQuestion) => {
  const [alternativaState, setAlternativaState] = useState<string>('')
  const enunciadoRef = useRef(null)
  const radioRef = useRef<HTMLInputElement>(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: enunciadoRef.current,
      getValue: (props) => {
        if (!props.value) {
          return {}
        }

        return {
          correta: radioRef.current?.checked,
          letra: value,
          enunciado: alternativaState
        }
      }
    })
  }, [fieldName, registerField])

  const handleValue = (e: any) => {
    setAlternativaState(e.target.value)
  }

  return (
    <Container>
      <label>
        <input type="radio" name={nameRadio} ref={radioRef} />
        <span>{letra.toUpperCase()}</span>
      </label>

      <input
        name={name}
        placeholder="Alternativa"
        ref={enunciadoRef}
        value={alternativaState}
        onChange={handleValue}
      />
    </Container>
  )
}
