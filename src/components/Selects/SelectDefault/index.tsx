import { useField } from '@unform/core'
import { useEffect, useRef } from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import makeAnimated from 'react-select/animated'
import { Props as SelectProps, OptionProps } from 'react-select'
import AsyncSelect from 'react-select/async'
import { Loading } from '../../Loading'
import { colourStyles, Container, Error } from './styles'

interface Props extends SelectProps<OptionProps> {
  name: string
  messageNoOptions: string
  isLoadingMessage: string
  handleSearch: any
  isMultiOptions?: boolean
}

const animatedComponents = makeAnimated()

export const SelectDefault = ({
  name,
  messageNoOptions,
  handleSearch,
  isLoadingMessage,
  isMultiOptions,
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

        if (!props.value) {
          return {}
        }
        return props.value
      }
    })
  }, [fieldName, registerField, rest.isMulti])

  return (
    <Container>
      <AsyncSelect
        isMulti={isMultiOptions}
        cacheOptions
        defaultOptions
        loadOptions={handleSearch}
        styles={colourStyles}
        ref={selectRef}
        loadingMessage={() => isLoadingMessage}
        noOptionsMessage={() => messageNoOptions}
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
