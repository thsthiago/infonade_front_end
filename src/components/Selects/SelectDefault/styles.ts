import { GroupBase, GroupProps, OptionProps, StylesConfig } from 'react-select'
import styled from 'styled-components'
import Tooltip from '../../Tooltip'

export const colourStyles: any = {
  dropdownIndicator: (styles: any) => ({
    ...styles,
    color: '#25232F',
    outline: 'none'
  }),
  container: (styles: any) => ({
    ...styles,
    border: '3px solid #25232F',
    ':hover': {
      border: '3px solid #25232F'
    },
    ':active': {
      border: '3px solid #25232F'
    },
    outline: 'none',
    borderRadius: '5px',
    fontFamily: "'Roboto', sans-serif"
  }),
  control: (styles: any) => ({
    ...styles,
    backgroundColor: 'white',
    border: 'none',
    boxShadow: 'none',
    ':focus': {
      boxShadow: 'none'
    },
    ':hover': {
      boxShadow: 'none'
    }
  }),
  menuList: (styles: any) => ({
    ...styles,
    padding: '0px'
  }),
  option: (styles: any, { isSelected }: { isSelected: any }) => {
    return {
      ...styles,
      padding: '10px 10px',
      ':hover': {
        color: '#fff',
        backgroundColor: '#413D51'
      },
      backgroundColor: isSelected ? '#25232F' : '#fff'
    }
  }
}

export const Container = styled.div`
  position: relative;
  width: 100%;
`

export const Error = styled(Tooltip)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 40px;
  height: 20px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: var(--text);
    &::before {
      border-color: #c53030 transparent;
    }
  }

  @media (max-width: 900px) {
    right: 50px;
  }
`
