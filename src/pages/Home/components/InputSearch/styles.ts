import styled from 'styled-components'

export const Container = styled.form`
  width: 90%;
  max-width: 700px;
  background: #ffffff;
  position: absolute;
  display: flex;
  bottom: 60%;
  left: 5%;
  border-radius: 5px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  padding: 13px 0;

  input {
    flex: 1;
    border: none;
    padding: 0 10px;
    border-radius: 5px;
    font-size: clamp(0.8rem, 2vw, 16px);
  }

  input::placeholder {
    font-weight: 400;
    font-size: clamp(0.8rem, 2vw, 16px);
  }

  button {
    width: 20%;
    max-width: 80px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(1.4rem, 2vw, 20px);
    color: var(--secondary);
    border-radius: 5px;
  }

  @media (min-width: 768px) {
    width: 40%;
    max-width: 700px;
    bottom: 10%;
    left: 5%;
  }
`
