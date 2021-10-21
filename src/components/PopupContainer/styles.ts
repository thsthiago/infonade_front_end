import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 20px 2% 0;
  overflow: hidden;
  z-index: 5;
  @media (max-width: 1023px) {
    top: 50px;
  }

  @media (max-width: 400px) {
    width: 100%;
  }
`
