import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;
  max-width: 700px;
  border-radius: 10px;

  form {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    background: var(--secondary);
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .select {
      width: 100%;
    }

    > div {
      display: flex;
      justify-content: space-between;
    }
  }

  > div {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    background: #ffffff;
    border-radius: 10px;
    padding: 10px;

    > p {
      background: var(--primary);
      padding: 10px 10px;
      color: var(--text);
      border-radius: 5px;
      margin-bottom: 10px;
    }

    .disciplinas {
      display: flex;
      flex-wrap: wrap;
      p {
        background: var(--secondary);
        padding: 5px 10px;
        color: var(--text);
        border-radius: 30px;
        margin-bottom: 10px;
        margin-right: 10px;
      }
    }

    & > .tooltip {
      background: #fff;
    }

    .edicoes {
      display: flex;

      p {
        background: var(--primary);
        padding: 3px 10px;
        color: var(--text);
        margin-bottom: 10px;
        & + p {
          margin-left: 10px;
        }
      }
    }

    > div:last-of-type {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
`
