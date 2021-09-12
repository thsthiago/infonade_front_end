import React from 'react'

import { GlobalStyles, Container } from './styles/global'
import { BrowserRouter } from 'react-router-dom'

import { Header } from './components/Header'

import Routes from './routes'

const App = () => (
  <Container>
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>
    <GlobalStyles />
  </Container>
)

export default App
