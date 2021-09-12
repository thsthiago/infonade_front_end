import styled from 'styled-components'

export const Container = styled.header`
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 10px 0;
  grid-area: 'header';
  background: var(--primary);
  overflow-y: hidden;
  display: flex;
  justify-content: center;

  > a {
    width: 100%;
    max-width: 150px;
    color: var(--blue-200);
    font-family: 'Oswald', sans-serif;
    display: flex;
    align-items: center;
    gap: 5px;

    img {
      height: 50px;
    }

    strong {
      font-weight: 500;
      font-size: clamp(1.8rem, 2vw, 2.3rem);
    }
  }

  @media (min-width: 768px) {
    filter: drop-shadow(0px 0px 30px rgba(0, 0, 0, 0.3));
    height: 100vh;
    width: 80px;
    transition: width 0.3s;
    display: block;

    &:hover {
      width: 200px;
    }

    > a {
      padding: 10px 0 0 20px;

      strong {
        opacity: 0;
        transition: opacity 0.3s;
      }
    }

    &:hover > a strong {
      opacity: 1;
    }
  }
`
