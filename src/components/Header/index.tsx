import React from 'react'

import LogoImg from '../../assets/Logo.svg'

import { Link } from 'react-router-dom'
import { Container } from './styles'

export const Header = () => {
  return (
    <Container>
      <Link to="/">
        <img src={LogoImg} alt="Coruja com chapéu" />
        <strong>Infonade</strong>
      </Link>
    </Container>
  )
}
