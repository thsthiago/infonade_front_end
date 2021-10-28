import { useState } from 'react'
import { Container } from './styles'

interface IRadioQuestion {
  value: string
  name: string
  letra: string
}

export const RadioQuestion = ({ letra, ...rest }: IRadioQuestion) => {
  const [alternativaState, setAlternativaState] = useState<string>('')

  const handleValue = (e: any) => {
    setAlternativaState(e.target.value)
  }

  return (
    <Container>
      <label>
        <input type="radio" {...rest} />
        <span>{letra.toUpperCase()}</span>
      </label>

      <input
        name="resposta"
        placeholder="Alternativa"
        value={alternativaState}
        onChange={handleValue}
      />
    </Container>
  )
}
