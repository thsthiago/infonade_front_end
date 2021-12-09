import styled from 'styled-components'

export const Container = styled.main`
  width: 100%;
  height: 100%;
  padding-top: 70px;
  padding: 100px 2% 0;
  max-width: 800px;
  margin: 0 auto;

  section.containerQuestao {
    width: 100%;
  }

  .curso {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    flex-wrap: wrap;
    gap: 10px;

    h1 {
      color: var(--secondary);
      font-size: clamp(1.1rem, 2.5vw, 1.4rem);
    }

    strong {
      font-weight: 500;
    }
  }

  .questao {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    background: #ffffff;
    border-radius: 10px;
    padding: 20px;

    .boxDisciplinas {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      .disciplinas {
        p {
          padding: 4px 10px;
          background: var(--secondary);
          color: var(--text);
          border-radius: 15px;
          margin-top: 5px;
          margin-right: 5px;
          font-size: clamp(0.9rem, 2vw, 1rem);
          text-align: center;
        }
      }

      strong {
        font-weight: 500;
      }
    }

    .enunciado {
      margin-bottom: 20px;
    }

    .alternativas {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 30px;

      .alternativa {
        display: flex;
        gap: 10px;

        strong {
          border-radius: 11.5px;
          height: 23px;
          width: 23px;
          padding: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--secondary);
          border: 1px solid var(--secondary);
          font-weight: 500;

          &.select {
            background-color: var(--secondary);
            color: var(--text);
          }
        }
      }
    }

    .boxBtns {
      display: flex;
      justify-content: flex-end;
      gap: 15px;
      flex-wrap: wrap;
    }
  }

  section.containerAnotacoes {
    margin-top: 30px;

    h1 {
      font-size: clamp(1.1rem, 2.5vw, 1.4rem);
      font-weight: 400;
      color: var(--secondary);
      margin-bottom: 10px;
    }

    .anotacoes {
      margin-bottom: 15px;

      .anotacao {
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
        background: #ffffff;
        border-radius: 10px;
        padding: 20px;
        height: 100%;
        min-height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        & + div {
          margin-top: 20px;
        }

        > div {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .date {
          font-weight: 500;
          color: var(--secondary);
        }
      }
    }

    .criarAnotacao {
      h1 {
        font-size: clamp(1.1rem, 2.5vw, 1.4rem);
        font-weight: 400;
      }

      form {
        padding: 5px 10px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 10px;

        textarea {
          resize: none;
          height: 100px;
          border-radius: 5px;
          width: 100%;
          padding: 10px;
          border: 1px solid var(--secondary);
        }
      }
    }
  }

  @media (min-width: 768px) {
    padding: 30px 0%;
    padding-left: 80px;
  }
`
