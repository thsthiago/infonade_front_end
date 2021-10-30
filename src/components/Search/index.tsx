import { InputHTMLAttributes, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { Container } from './styles'

interface ISearch extends InputHTMLAttributes<HTMLInputElement> {
  handleSubmit(e: any): void
}

export const Search = ({ handleSubmit, ...rest }: ISearch) => {
  const [state, setState] = useState<string>('')

  const handleState = (e: any) => {
    setState(e.target.value)
  }

  return (
    <Container onSubmit={(e: any) => handleSubmit(e.target.value)}>
      <input {...rest} value={state} onChange={handleState} />
      <button type="submit">
        <FiSearch />
      </button>
    </Container>
  )
}
