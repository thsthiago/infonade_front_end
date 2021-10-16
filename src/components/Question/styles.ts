import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 750px;
  margin: 30px auto;
  padding: 15px 20px;
  background: #ffffff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  border-radius: 20px;

  a {
    width: 100%;
    height: 100%;

    > div:nth-of-type(1) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      color: var(--secondary);

      h1 {
        font-size: clamp(0.9rem, 2.5vw, 1.5rem);
      }

      strong {
        font-size: clamp(0.9rem, 2vw, 1rem);
      }
    }

    > p {
      width: 100%;
      text-align: justify;
      margin-top: 10px;
      color: #3d3c3c;
      font-size: clamp(0.9rem, 2vw, 1rem);
    }

    > div:nth-of-type(2) {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      color: var(--secondary);
      padding-top: 10px;

      > div {
        display: flex;
        flex-wrap: wrap;
        flex: 1;
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
        font-size: clamp(0.9rem, 2vw, 1rem);
      }
    }
  }
`
