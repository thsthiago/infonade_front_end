import styled from 'styled-components'
import BackgroundHome from '../../assets/backgroundHome.svg'

export const Container = styled.main`
  width: 100%;
  height: 100%;
  grid-area: 'page';

  section {
    width: 100%;
    max-width: 1900px;
    height: 45%;
    background: url(${BackgroundHome}) no-repeat;
    background-position: -10px top;
    background-size: contain;
    justify-content: space-between;
    padding: 2%;
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    > div {
      width: 100%;

      h1 {
        font-size: clamp(1.4rem, 4vw, 50px);
        color: var(--text);
        padding: 5% 0 0 10%;
        font-weight: 500;

        span {
          color: var(--blue-200);
        }
      }
    }

    img {
      width: 70%;
      max-width: 390px;
      margin: 80px auto 0;
    }

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: initial;

      > div {
        width: 60%;

        h1 {
          font-size: clamp(1.4rem, 4vw, 50px);
          color: var(--text);
          padding: 5% 0 0 10%;
          font-weight: 500;

          span {
            color: var(--blue-200);
          }
        }
      }
    }
  }
`
