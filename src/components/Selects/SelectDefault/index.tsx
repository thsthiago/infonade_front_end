import { useField } from '@unform/core'
import { useEffect, useRef } from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import { Props as SelectProps, OptionProps } from 'react-select'
import AsyncSelect from 'react-select/async'
import { Loading } from '../../Loading'
import { colourStyles, Container, Error } from './styles'

interface Props extends SelectProps<OptionProps> {
  name: string
  messageNoOptions: string
  isLoadingMessage: string
  handleSearch: any
}

export const SelectDefault = ({
  name,
  messageNoOptions,
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
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={handleSearch}
        styles={colourStyles}
        ref={selectRef}
        loadingMessage={() => isLoadingMessage}
        noOptionsMessage={() => messageNoOptions}
        components={{
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
        <Error title="Curso obrigatório">
          <FiAlertCircle color="#c53030" />
        </Error>
      )}
    </Container>
  )
}