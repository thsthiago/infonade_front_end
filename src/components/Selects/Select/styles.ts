import { StylesConfig } from 'react-select'

export const colourStyles: StylesConfig<true> = {
  dropdownIndicator: (styles) => ({
    ...styles,
    color: '#25232F',
    outline: 'none'
  }),
  container: (styles) => ({
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
  control: (styles, { isFocused, isMulti, isRtl }) => ({
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
  menuList: (styles) => ({
    ...styles,
    padding: '0px'
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
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
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: '#413D51'
    }
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: '#fff'
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: '#fff',
    ':hover': {
      backgroundColor: '#25232F',
      color: '#fff'
    }
  })
}
