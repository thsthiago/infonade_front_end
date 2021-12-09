import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 700px;
  background: #ffffff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  height: 100%;
  min-height: 170px;
  margin-top: 20px;

  img {
    display: none;
  }

  a {
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    min-height: 170px;

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

    > div:nth-of-type(2) {
      width: 100%;

      text-align: justify;
      margin-top: 10px;
      color: #3d3c3c;
      font-size: clamp(0.9rem, 2vw, 1rem);
      /* height: 91.5px; */
      max-height: 110px;
      display: block;
      display: -webkit-box;
      max-width: 720px;
      font-size: 20dp;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;

      p {
        display: block;
        display: -webkit-box;
        max-width: 720px;
        font-size: 20dp;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* > p:not(p:first-of-type) {
        display: none;
      } */
    }

    > div:nth-of-type(3) {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      color: var(--secondary);
      padding-top: 10px;
      flex-grow: 1;

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
          height: 100%;
        }
      }

      strong {
        font-size: clamp(0.9rem, 2vw, 1rem);
      }
    }
  }
`
