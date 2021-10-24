import { StylesConfig } from 'react-select'

export const colourStyles = {
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
  },
  multiValue: (styles: any) => {
    return {
      ...styles,
      backgroundColor: '#413D51'
    }
  },
  multiValueLabel: (styles: any) => ({
    ...styles,
    color: '#fff'
  }),
  multiValueRemove: (styles: any) => ({
    ...styles,
    color: '#fff',
    ':hover': {
      backgroundColor: '#25232F',
      color: '#fff'
    }
  })
}
