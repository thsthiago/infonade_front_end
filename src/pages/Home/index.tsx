import React from 'react'

import PlanetGif from '../../assets/planet.gif'
import { CardTemplate } from '../../components/CardTemplate'
import { InputSearch } from '../../components/InputSearch'
import { Container } from './styles'

type cursoDataProps = {
  id: number
  curso: string
  edicao: number
}

const Home = () => {
  const data: cursoDataProps[] = [
    {
      id: 1,
      curso: 'Análise e Desenvolvimento de Sistemas',
      edicao: 2017
    },
    {
      id: 2,
      curso: 'Ciência da Computação',
      edicao: 2008
    },
    {
      id: 3,
      curso: 'Gestão de TI',
      edicao: 2007
    },
    {
      id: 4,
      curso: 'Reder e Computadores',
      edicao: 2007
    }
  ]

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
      <section>
        <h1>Provas</h1>
        <div>
          {data.map((data) => (
            <CardTemplate key={data.id} {...data} />
          ))}
        </div>
      </section>

      <section>
        <h1>Gabaritos</h1>
        <div>
          {data.map((data) => (
            <CardTemplate key={data.id} {...data} />
          ))}
        </div>
      </section>
    </Container>
  )
}

export default Home
