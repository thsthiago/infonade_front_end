import makeAnimated from 'react-select/animated'
import { Props as SelectProps, OptionProps } from 'react-select'
import AsyncCreatableSelect from 'react-select/async-creatable'
import { colourStyles, Container, Error } from './styles'
import { useEffect, useRef } from 'react'
import { useField } from '@unform/core'
import { FiAlertCircle } from 'react-icons/fi'
import { Loading } from '../../Loading'

interface Props extends SelectProps<OptionProps> {
  name: string
  handleSearch?(): any
  isLoadingMessage?: string
}

const animatedComponents = makeAnimated()

export const SelectCreate = ({
  name,
  handleSearch,
  isLoadingMessage,
  ...rest
}: Props) => {
  const selectRef = useRef(null)
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
      }
    })
  }, [fieldName, registerField, rest.isMulti])

  return (
    <Container>
      <AsyncCreatableSelect
        isMulti
        cacheOptions
        defaultOptions
        ref={selectRef}
        styles={colourStyles}
        formatCreateLabel={(value) => `Criar disciplina: ${value}`}
        components={{
          ...animatedComponents,
          LoadingIndicator: () => (
            <Loading
              size={17}
              border={3}
              styles={{
                position: 'absolute',
                top: '50%',
                right: '50px',
                transform: 'translateY(-65%)'
              }}
            />
          )
        }}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" />
        </Error>
      )}
    </Container>
  )
}
