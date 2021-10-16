import styled from 'styled-components'

export const Container = styled.main`
  width: 100%;
  height: 100%;
  padding-top: 75px;
  padding: 75px 2% 0;

  > div:first-child {
    display: flex;
    position: relative;
    padding-top: 30px;
    gap: 10px;
    margin: 0 auto;
    max-width: 600px;
  }

  > div:last-child {
    width: 100%;
    max-width: 800px;
    margin: 50px auto 30px;
    padding: 0 2%;
  }

  @media (min-width: 768px) {
    padding: 0%;
    padding-left: 80px;
  }
`
