import { GlobalStyles, Container } from './styles/global'
import { BrowserRouter } from 'react-router-dom'

import { Header } from './components/Header'

import Routes from './routes'
import AppProvider from './hooks'

const App = () => (
  <Container>
    <BrowserRouter>
      <AppProvider>
        <Header />
        <Routes />
      </AppProvider>
      <GlobalStyles />
    </BrowserRouter>
  </Container>
)

export default App
