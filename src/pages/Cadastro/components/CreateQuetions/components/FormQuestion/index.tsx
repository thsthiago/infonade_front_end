import { FormHandles } from '@unform/core'
import { useCallback, useRef, useState } from 'react'
import * as Yup from 'yup'
import { usePopup } from '../../../../../../hooks/usePopup'
import { Container } from './styles'
import getValidationErrors from '../../../../../../utils/getValidationErrors'
import { SelectDefault } from '../../../../../../components/Selects/SelectDefault'
import { Select } from '../../../../../../components/Selects/Select'
import { Input } from '../../../../../../components/Input'
import { Editor, EditorState } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

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

  const handleSubmit = useCallback(async (data) => {
    try {
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        curso: Yup.string().required('Nome do curso obrigatório')
      })

      await schema.validate(data, {
        abortEarly: false
      })

      addPopup({
        type: 'success',
        title: 'Curso criado com sucesso!'
      })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)
      }
    }
  }, [])

  return (
    <Container ref={formRef} onSubmit={handleSubmit}>
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
      <Editor
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        toolbarClassName="toolbar-class"
        editorStyle={{
          background: '#fff',
          height: 170,
          padding: '0 10px',
          fontFamily: '"Roboto", open-sans'
        }}
      />
    </Container>
  )
}
