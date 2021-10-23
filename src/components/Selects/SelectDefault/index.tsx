import { useField } from '@unform/core'
import { useEffect, useRef } from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import Select, { Props as SelectProps, OptionProps } from 'react-select'
import { colourStyles, Container, Error } from './styles'

interface Props extends SelectProps<OptionProps> {
  name: string
}

export const SelectDefault = ({ name, ...rest }: Props) => {
  const selectRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (!ref.props.value) {
          return null
        }
        return ref.props.value
      }
    })
  }, [fieldName, registerField, rest.isMulti])

  return (
    <Container>
      <Select
        styles={colourStyles}
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
      />

      {error && (
        <Error title="Curso obrigatório">
          <FiAlertCircle color="#c53030" />
        </Error>
      )}
    </Container>
  )
}
