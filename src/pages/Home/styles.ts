import styled from 'styled-components'
import BackgroundHome from '../../assets/backgroundHome.svg'

export const Container = styled.main`
  width: 100%;
  height: 100%;
  padding-top: 70px;

  @media (min-width: 768px) {
    padding-top: 0px;
    padding-left: 80px;
  }

  section:first-child {
    width: 100%;
    max-width: 1900px;
    height: 45%;
    max-height: 400px;
    background: url(${BackgroundHome}) no-repeat;
    background-position: -10px top;
    background-size: contain;
    justify-content: space-between;
    padding: 2%;
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
        font-weight: lighter;

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
      max-height: 400px;
      margin-bottom: 60px;

      > div {
        width: 60%;

        h1 {
          font-size: clamp(1.4rem, 4vw, 50px);
          color: var(--text);
          padding: 5% 0 0 5%;
          font-weight: lighter;

          span {
            color: var(--blue-200);
            font-weight: lighter;
            font-family: 'Oswald', sans-serif;
          }
        }
      }

      img {
        height: 100%;
        margin: 80px auto 0;
      }
    }

    @media (min-width: 1800px) {
      > div {
        width: 70%;

        h1 {
          padding: 5% 0 0 5%;
        }
      }

      img {
        width: 30%;
        max-width: 390px;
        margin: 80px auto 0;
      }
    }
  }

  section:nth-child(2) {
    margin-top: 20px;
    @media (min-width: 768px) {
      margin-top: 70px;
    }
  }

  section:nth-child(2),
  section:nth-child(3) {
    margin-bottom: 20px;
    width: 100%;
    max-width: 1920px;
    padding: 0 3%;

    > h1 {
      margin-bottom: 10px;
      color: var(--primary);
    }

    > div {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    @media (min-width: 768px) {
      &:nth-child(2) {
        margin-top: 20px;
      }

      > div {
        flex-wrap: nowrap;
      }
    }
  }
`
