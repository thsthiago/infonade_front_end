import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #25232F;
    --secondary: #413D51;
    --background: #F1F8F4;
    --border-color: #413D51;
    --blue-200: #8FE3F9;
    --blue-100: #B2EBF9;
    --text: #F2F2F2;
    --delete-btn: #E35151;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    overflow-x: hidden;

    @media(min-width: 768px) {
      overflow-x: initial;
    }
  }

  #__next  {
    width: 100%;
    height: 100%;
  }

  h1, h2, h3, h4, h5 {
    font-family: 'Oswald', sans-serif;
  }

  p,
  a,
  li,
  tr,
  td,
  input,
  textarea,
  button,
  strong {
    font-family: 'Roboto', sans-serif;
    font-size: clamp(0.8rem, 2.5vw, 1rem);
  }

  a {
    text-decoration: none;
  }

  body {
    background: var(--background);
  }

  button {
    outline: none;
    cursor: pointer;
    border: none;
  }

  &::-webkit-scrollbar {
    width: 8px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 8px;
  }

  .ReactModal__Body--open,
  .ReactModal__Html--open {
    overflow: hidden;
  }
`

export const Container = styled.main`
  width: 100%;
  height: 100%;

  @media (min-width: 768px) {
    display: flex;
  }
`
