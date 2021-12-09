import React, { InputHTMLAttributes, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'

import { Container } from './styles'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const InputSearch = ({ ...rest }: IInputProps) => {
  const [state, setState] = useState<string>('')
  const history = useHistory()

  const handleState = (e: any) => {
    const format = e.target.value.replace(/[^a-zA-Z ]/g, '')
    setState(format)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  return (
    <Container
      onSubmit={(e) => {
        history.push('/consulta')
      }}>
      <input {...rest} placeholder="Pesquise por curso ou disciplina" />
      <button type="submit">
        <FiSearch />
      </button>
    </Container>
  )
}
