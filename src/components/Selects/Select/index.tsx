import SelectComponent from 'react-select'
import makeAnimated from 'react-select/animated'
import { colourStyles } from './styles'

interface GroupBase<Option> {
  readonly options: readonly Option[]
  readonly label?: string
}

interface SelectProps<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> {
  Option?: any[]
  IsMulti: boolean
  Group?: GroupBase<Option>
  options: any
  placeholder: string
}

const animatedComponents = makeAnimated()

function Select<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: SelectProps<Option, IsMulti, Group>) {
  return <SelectComponent isMulti {...props} styles={colourStyles} />
}

export { Select }
