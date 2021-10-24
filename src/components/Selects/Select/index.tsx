import SelectComponent, {
  Props as SelectProps,
  OptionProps
} from 'react-select'
import { colourStyles } from './styles'

interface Props extends SelectProps<OptionProps> {
  name: string
  options: any
  optionsMessage: string
  defaultValue: any
}

export const Select = ({ name, optionsMessage, ...rest }: Props) => {
  return (
    <SelectComponent
      {...rest}
      styles={colourStyles}
      noOptionsMessage={() => optionsMessage}
    />
  )
}
