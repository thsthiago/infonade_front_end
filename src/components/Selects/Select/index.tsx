import { useField } from '@unform/core'
import { useEffect, useRef } from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import SelectComponent, {
  Props as SelectProps,
  OptionProps
} from 'react-select'
import { Container, colourStyles, Error } from './styles'

interface Props extends SelectProps<OptionProps> {
  name: string
  options: any
  optionsMessage: string
  defaultValue?: any
}

export const Select = ({ name, optionsMessage, ...rest }: Props) => {
  const selectRef = useRef<any>(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: ({ props }) => {
        if (props.isMulti) {
          if (!props.value) {
            return []
          }
          return props.value.map((option: any) => option.value)
        }

        if (!props.value) {
          return {}
        }
        return props.value
      },
      setValue: () => {
        selectRef.current.setValue(null)
      }
    })
  }, [fieldName, registerField, rest.isMulti])

  return (
    <Container>
      <SelectComponent
        ref={selectRef}
        defaultValue={defaultValue}
        {...rest}
        styles={colourStyles}
        noOptionsMessage={() => optionsMessage}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" />
        </Error>
      )}
    </Container>
  )
}
