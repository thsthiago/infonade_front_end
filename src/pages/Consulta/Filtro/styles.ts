import styled from 'styled-components'
import { shade } from 'polished'

interface FiltroStyleProps {
  typeQuestion: string
}

export const Container = styled.div<FiltroStyleProps>`
  position: absolute;
  top: 90px;
  width: 100%;
  max-width: 320px;
  background: #ffffff;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 15px;
  color: var(--secondary);

  > div:first-of-type {
    display: flex;
    justify-content: space-between;

    h1 {
      font-size: 25px;
      font-weight: 500;
    }

    button {
      font-size: 0px;
      background-color: #ffffff;

      svg {
        color: var(--secondary);

        &:hover {
          color: var(--primary);
        }
      }
    }
  }

  > div {
    margin-bottom: 15px;

    strong {
      display: block;
      font-weight: 500;
      margin-bottom: 5px;
    }
  }

  > div:last-of-type {
    strong {
      margin-bottom: 10px;
    }

    div {
      display: flex;

      button {
        width: 50%;
        border: 1px solid var(--secondary);
        border-radius: 4px;
        padding: 7px 0;
        padding-left: 10px;
        position: relative;
        transition: background 0.4s;

        & + button {
          margin-left: 10px;
        }

        &:after {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 12px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
      }

      button:first-of-type {
        background: ${(props) =>
          props.typeQuestion === 'dissertativa'
            ? 'var(--secondary)'
            : '#ffffff'};

        color: ${(props) =>
          props.typeQuestion === 'dissertativa'
            ? '#ffffff'
            : 'var(--secondary)'};

        &:after {
          background: ${(props) =>
            props.typeQuestion === 'dissertativa'
              ? '#ffffff'
              : 'var(--secondary)'};
        }
      }

      button:last-of-type {
        background: ${(props) =>
          props.typeQuestion === 'alternativa'
            ? 'var(--secondary)'
            : '#ffffff'};
        color: ${(props) =>
          props.typeQuestion === 'alternativa'
            ? '#ffffff'
            : 'var(--secondary)'};

        &:after {
          background: ${(props) =>
            props.typeQuestion === 'alternativa'
              ? '#ffffff'
              : 'var(--secondary)'};
        }
      }
    }
  }

  > button {
    width: 100%;
    padding: 12px 0;
    background: var(--secondary);
    color: var(--text);
    border-radius: 5px;
    transition: background 0.4s;
    &:hover {
      background: ${shade(0.1, '#413D51')};
    }
  }
`
