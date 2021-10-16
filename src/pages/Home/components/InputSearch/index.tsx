import React, { useState } from 'react'

import { FiSearch } from 'react-icons/fi'

import { Container } from './styles'

export const InputSearch = () => {
  const [state, setState] = useState<string>('')

  const handleState = (e: any) => {
    const format = e.target.value.replace(/[^a-zA-Z ]/g, '')
    setState(format)
    console.log(format)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  return (
    <Container onSubmit={(e) => handleSubmit(e)}>
      <input
        value={state}
        onChange={handleState}
        placeholder="Pesquise por curso ou disciplina"
      />
      <button type="submit">
        <FiSearch />
      </button>
    </Container>
  )
}
