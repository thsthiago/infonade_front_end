import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 70px;
  padding: 100px 2% 0;
  max-width: 800px;
  margin: 0 auto;

  > p {
    color: var(--secondary);
    font-size: 15px;
    margin-bottom: -10px;
    margin-top: 30px;
  }

  @media (min-width: 768px) {
    padding: 30px 0%;
    padding-left: 80px;
  }
`
