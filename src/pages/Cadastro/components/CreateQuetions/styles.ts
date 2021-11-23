import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;

  > form {
    h1 {
      font-size: clamp(1rem, 2.5vw, 1.4rem);
      font-weight: 500;
    }

    > div {
      margin-bottom: 10px;
    }
  }
`

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const BoxBtn = styled.div`
  display: flex;
  justify-content: flex-end;
`
