import styled from 'styled-components'

export const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const ContainerButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  button {
    margin-top: 5px;
  }

  @media (max-width: 400px) {
    flex-direction: column;
  }
`
