import makeAnimated from 'react-select/animated'
import { Props as SelectProps, OptionProps } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { colourStyles, Container, Error } from './styles'
import { useEffect, useRef } from 'react'
import { useField } from '@unform/core'
import { FiAlertCircle } from 'react-icons/fi'

interface Props extends SelectProps<OptionProps> {
  name: string
}

const animatedComponents = makeAnimated()

export const SelectCreate = ({ name, ...rest }: Props) => {
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
      <CreatableSelect
        isMulti
        {...rest}
        styles={colourStyles}
        components={animatedComponents}
      />

      {error && (
        <Error title="Curso obrigatório">
          <FiAlertCircle color="#c53030" />
        </Error>
      )}
    </Container>
  )
}
