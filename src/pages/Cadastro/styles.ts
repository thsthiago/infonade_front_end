import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 70px;
  padding: 70px 2% 0;
  max-width: 800px;
  margin: 0 auto;

  > div:first-child {
    width: 100%;
    max-width: 650px;
    margin: 60px auto 30px;
    display: flex;
    justify-content: space-between;
    position: relative;

    > span {
      position: absolute;
      display: block;
      height: 4px;
      width: 100%;
      background: var(--secondary);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
    }
  }

  @media (min-width: 768px) {
    padding: 0px 2% 0;
    padding-left: 80px;
  }
`

interface IButtonProps {
  isSelect: boolean
}

export const Button = styled.button<IButtonProps>`
  background: ${(props) => (props.isSelect ? `var(--secondary)` : '#ffffff')};
  color: ${(props) => (props.isSelect ? '#ffffff' : `var(--secondary)`)};
  border: 2px solid var(--secondary);
  border-radius: 20px;
  padding: 10px 12px;
  padding-left: 30px;
  min-width: 100px;
  position: relative;

  span {
    position: absolute;
    display: block;
    height: 10px;
    width: 10px;
    background: ${(props) => (props.isSelect ? '#ffffff' : `var(--secondary)`)};
    top: 50%;
    left: 15%;
    transform: translateY(-50%);
    border-radius: 50%;
  }
`
