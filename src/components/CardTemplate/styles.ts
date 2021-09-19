import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled(Link)`
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.25);
  width: 45%;
  max-width: 260px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  padding-bottom: 20px;
  text-align: center;
  margin-bottom: 20px;

  > div {
    margin-bottom: 10px;
    background: var(--primary);
    color: var(--blue-200);
    height: 75px;
    padding-top: 20px;
    border-radius: 0px 0px 45% 45%;

    h1 {
      font-size: clamp(0.8rem, 2vw, 1.1rem);
      font-weight: 400;
      text-align: center;
    }
  }

  strong {
    font-family: 'Oswald', sans-serif;
    font-weight: 400;
    color: #3d3d3d;
    font-size: clamp(0.8rem, 2vw, 1.1rem);
  }

  @media (min-width: 768px) {
    width: 33.3%;
  }

  @media (min-width: 1920px) {
    max-width: 340px;
  }
`
