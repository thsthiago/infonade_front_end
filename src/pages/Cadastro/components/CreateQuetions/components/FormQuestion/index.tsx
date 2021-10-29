import { FormHandles } from '@unform/core'
import { useRef } from 'react'
import { usePopup } from '../../../../../../hooks/usePopup'
import { Container } from './styles'
import { SelectDefault } from '../../../../../../components/Selects/SelectDefault'
import { Select } from '../../../../../../components/Selects/Select'
import { Input } from '../../../../../../components/Input'
import { RadioQuestion } from './components/RadioQuestion'
import { Editor } from '../../../../../../components/Editor'

const mockDisciplinas: any = [
  {
    value: 'Engenharia de software',
    label: 'Engenharia de software'
  },
  {
    value: 'Programação web',
    label: 'Programação web'
  },
  {
    value: 'Cliente/Servidor',
    label: 'Cliente/Servidor'
  }
]

export const FormQuestion = () => {
  const formRef = useRef<FormHandles>(null)
  const { addPopup } = usePopup()

  const pesquisaTeste = (value: string): any => {
    return mockDisciplinas.filter(
      (disciplina: { label: string; value: number }) =>
        disciplina.label.toLowerCase().includes(value.toLowerCase())
    )
  }

  const handleSearch: any = async (value: string) =>
    new Promise<any[]>((resolve) => {
      setTimeout(() => {
        resolve(pesquisaTeste(value))
      }, 1000)
    })

  return (
    <Container>
      <SelectDefault
        isMulti
        handleSearch={handleSearch}
        isLoadingMessage="Procurando disciplina..."
        messageNoOptions="Disciplina não encontrada"
        name="disciplinas"
        placeholder="Selecione uma disciplina"
      />

      <Select
        name="type"
        options={[
          {
            value: 'dissertativa',
            label: 'Dissertativa'
          },
          {
            value: 'alternativa',
            label: 'Alternativa'
          }
        ]}
        optionsMessage="Essa opção não existe"
        defaultValue={{
          value: 'dissertativa',
          label: 'Dissertativa'
        }}
      />
      <Input name="numeroQuestao" placeholder="Número da questão" />
      <Editor name="enunciado" />

      <RadioQuestion name="letraA" nameRadio="teste" value="A" letra="A" />
      <RadioQuestion name="letraB" nameRadio="teste" value="B" letra="B" />
      <RadioQuestion name="letraC" nameRadio="teste" value="C" letra="C" />
      <RadioQuestion name="letraD" nameRadio="teste" value="D" letra="D" />
      <RadioQuestion name="letraE" nameRadio="teste" value="E" letra="E" />
    </Container>
  )
}
