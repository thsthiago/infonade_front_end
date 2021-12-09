import styled from 'styled-components'

export const overlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  backdropFilter: 'blur(1)',
  overlay: 'hidden',
  heigh: '100%',
  width: '100%'
}

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 500px;
  background: #ffffff;
  border-radius: 5px;
  padding: 20px;

  h1 {
    font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  }

  p {
    margin: 15px 0;
  }

  .boxBtn {
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    .confirm {
      width: 70px;
    }
  }
`
