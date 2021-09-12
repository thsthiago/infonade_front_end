import styled, { keyframes } from 'styled-components'

interface INavMobile {
  activeNav: boolean
  pathname: string
}

interface INavDesktop {
  pathname: string
}

const animationLink = keyframes`
  from {
    left: 200%;
    opacity: 0;

  }
  to {
    left: 30%;
    opacity: 1;
  }
`

export const Container = styled.header`
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 10px 0;
  grid-area: 'header';
  background: var(--primary);
  display: flex;
  justify-content: center;
  filter: drop-shadow(0px 0px 30px rgba(0, 0, 0, 0.3));

  > a {
    width: 100%;
    max-width: 150px;
    color: var(--blue-200);
    font-family: 'Oswald', sans-serif;
    display: flex;
    align-items: center;
    gap: 5px;

    img {
      height: 50px;
    }

    strong {
      font-weight: 500;
      font-size: clamp(1.8rem, 2vw, 2.3rem);
    }
  }

  @media (min-width: 768px) {
    height: 100vh;
    width: 80px;
    transition: width 0.3s;
    overflow-y: hidden;
    display: block;

    &:hover {
      width: 180px;
    }

    > a {
      padding: 10px 0 0 20px;

      strong {
        opacity: 0;
        transition: opacity 0.3s;
      }
    }

    &:hover > a strong {
      opacity: 1;
    }

    nav {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
  }
`

export const NavMobile = styled.div<INavMobile>`
  > div {
    width: 45px;
    height: 38px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: left;
    cursor: pointer;

    > span {
      display: block;
      background-color: var(--blue-200);
      width: ${(props) => (props.activeNav ? '22.5px' : '45px')};

      &,
      &::before,
      &::after {
        height: 5px;
        border-radius: 4px;
        background-color: var(--blue-200);
        transition: width 0.3s;
      }

      &::before {
        content: '';
        width: ${(props) => (props.activeNav ? '40px' : '45px')};
        position: absolute;
        top: 0;
        left: 0;
      }

      &::after {
        content: '';
        width: 45px;
        position: absolute;
        left: 0;
        bottom: 0;
        width: ${(props) => (props.activeNav ? '15px' : '45px')};
      }
    }
  }

  ul {
    width: 100%;
    position: absolute;
    left: ${(props) => (props.activeNav ? '0px' : '100%')};
    top: 70px;
    background: var(--primary);
    transition: left 0.4s;
    list-style: none;

    li:nth-of-type(1) {
      left: ${(props) => (props.activeNav ? '0' : '100%')};
      transition: left 0.4s;

      span {
        ${(props) =>
          props.pathname === '/' && 'background-color: var(--blue-200);'}
      }

      a {
        color: ${(props) =>
          props.pathname === '/' ? 'var(--blue-200)' : 'var(--blue-100)'};
      }
    }

    li:nth-of-type(2) {
      left: ${(props) => (props.activeNav ? '0' : '100%')};
      transition: left 0.6s;

      span {
        ${(props) =>
          props.pathname === '/consulta' &&
          'background-color: var(--blue-200);'}
      }

      a {
        color: ${(props) =>
          props.pathname === '/consulta'
            ? 'var(--blue-200)'
            : 'var(--blue-100)'};
      }
    }

    li:nth-of-type(3) {
      left: ${(props) => (props.activeNav ? '0' : '100%')};
      transition: left 0.8s;

      span {
        ${(props) =>
          props.pathname === '/cadastro' &&
          'background-color: var(--blue-200);'}
      }

      a {
        color: ${(props) =>
          props.pathname === '/cadastro'
            ? 'var(--blue-200)'
            : 'var(--blue-100)'};
      }
    }

    li {
      width: 100%;
      height: 47px;
      position: relative;

      span {
        display: block;
        height: 100%;
        width: 8px;
        position: absolute;
        top: 0;
        left: 0;
      }

      a {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          margin-right: 10px;
          font-size: 20px;
        }
      }
    }
  }

  @media (min-width: 768px) {
    display: none;
  }
`

export const NavDesktop = styled.ul<INavDesktop>`
  display: none;

  @media (min-width: 768px) {
    display: block;
    width: 100%;
    list-style: none;

    li:nth-of-type(1) {
      span {
        ${(props) =>
          props.pathname === '/' && 'background-color: var(--blue-200);'}
      }

      a {
        color: ${(props) =>
          props.pathname === '/' ? 'var(--blue-200);' : 'var(--blue-100);'};
      }
    }

    li:nth-of-type(2) {
      span {
        ${(props) =>
          props.pathname === '/consulta' &&
          'background-color: var(--blue-200);'}
      }

      a {
        color: ${(props) =>
          props.pathname === '/consulta'
            ? 'var(--blue-200);'
            : 'var(--blue-100);'};
      }
    }

    li:nth-of-type(3) {
      span {
        ${(props) =>
          props.pathname === '/cadastro' &&
          'background-color: var(--blue-200);'}
      }

      a {
        color: ${(props) =>
          props.pathname === '/cadastro'
            ? 'var(--blue-200)'
            : 'var(--blue-100)'};
      }
    }

    li {
      width: 100%;
      height: 47px;
      position: relative;

      span {
        display: block;
        height: 100%;
        width: 7px;
        position: absolute;
        top: 0;
        left: 0;
      }

      a {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 7px;
        display: flex;
        align-items: center;
        justify-content: center;

        strong {
          font-weight: 500;
          display: none;
          animation: ${animationLink} 0.3s;
          position: absolute;
          top: 50%;
          left: 30%;
          transform: translateY(-50%);

          ${Container}:hover & {
            display: block;
          }
        }

        > svg {
          margin-right: 10px;
          font-size: 25px;
          position: absolute;
          top: 50%;
          left: 20px;
          transform: translateY(-50%);
        }
      }
    }
  }
`
