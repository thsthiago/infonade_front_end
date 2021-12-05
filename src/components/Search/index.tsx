import { InputHTMLAttributes } from 'react'
import { FiSearch } from 'react-icons/fi'
import { Container } from './styles'

interface ISearch extends InputHTMLAttributes<HTMLInputElement> {
  handleSubmit?(e: any): void
}

export const Search = ({ handleSubmit, ...rest }: ISearch) => {
  return (
    <Container onSubmit={(e: any) => e.prenvtDefault()}>
      <input {...rest} />
      <button type="submit" disabled={true}>
        <FiSearch />
      </button>
    </Container>
  )
}
