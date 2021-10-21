import { Select } from '../../../../components/Select'
import { Container } from './styles'

export const CreateSubject = () => {
  const option: any = [
    {
      value: 0,
      label: 'Ciência da computação'
    },
    {
      value: 1,
      label: 'Análise e Desenvolvimento de Sistemas'
    }
  ]

  return (
    <Container>
      <Select options={option} IsMulti={false} />
    </Container>
  )
}
