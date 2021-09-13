import React from 'react'

import PlanetGif from '../../assets/planet.gif'
import { InputSearch } from '../../components/InputSearch'
import { Container } from './styles'

const Home = () => {
  return (
    <Container>
      <section>
        <div>
          <h1>
            Veja questões, provas e <br />
            <span>gabaritos do Enade!</span>
          </h1>
          <InputSearch />
        </div>

        <img src={PlanetGif} />
      </section>
    </Container>
  )
}

export default Home
