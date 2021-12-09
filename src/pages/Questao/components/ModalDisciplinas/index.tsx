import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useEffect, useRef, useState } from 'react'
import ReactModal, { Props } from 'react-modal'
import { Button } from 'src/components/Button'
import { Select } from 'src/components/Selects/Select'
import { IQuestionResponse } from 'src/interfaces/IQuestion'
import { subjectsService } from 'src/services/subjectsService'
import { Container, overlay } from './styles'
import * as Yup from 'yup'
import getValidationErrors from 'src/utils/getValidationErrors'
import { usePopup } from 'src/hooks/usePopup'
import { AiFillCloseCircle } from 'react-icons/ai'
import { questionsService } from 'src/services/questionsService'

ReactModal.setAppElement('#root')

interface IModalProps extends Props {
  setIsOpen: any
  data: IQuestionResponse
  refresh: () => void
}

const schema = Yup.object().shape({
  disciplinas: Yup.array()
    .min(1, 'Selecione pelo menos 1 disciplina')
    .of(Yup.number())
})

export const ModalDisciplinas = ({
  setIsOpen,
  refresh,
  data,
  ...rest
}: IModalProps) => {
  const elementRoot = document.querySelector('#root') as Element
  const { addPopup } = usePopup()
  const formRef = useRef<FormHandles>(null)
  const [disciplinas, setDisciplinas] = useState()

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleSubmit = async (dataForm: any) => {
    try {
      formRef.current?.setErrors({})
      await schema.validate(dataForm, {
        abortEarly: false
      })

      const disciplina = dataForm.disciplinas.map((item: number) => {
        return {
          id: item
        }
      })

      await questionsService.updateQuestion({
        ...data,
        disciplina: [...data.disciplina, ...disciplina]
      })

      addPopup({
        type: 'success',
        title: 'Disciplinas adicionadas com sucesso'
      })
      elementRoot.scrollIntoView({ behavior: 'smooth' })
      refresh()
      handleClose()
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error)
        formRef.current?.setErrors(errors)
        return
      }

      addPopup({
        type: 'error',
        title: 'Erro ao adicionar disciplinas'
      })
    }
  }

  const searchSubjects = async () => {
    try {
      const response = await subjectsService.getSubjects({
        params: { curso: data.curso.id }
      })

      const subjectsFormt: any = response.results.map((subject: any) => {
        return {
          value: subject.id,
          label: subject.nome
        }
      })

      setDisciplinas(subjectsFormt)
    } catch (err) {}
  }

  useEffect(() => {
    searchSubjects()
  }, [data])

  return (
    <ReactModal
      ariaHideApp={true}
      preventScroll={true}
      style={{ overlay: overlay as any }}
      onRequestClose={handleClose}
      shouldCloseOnOverlayClick={false}
      contentElement={() => (
        <Container>
          <button className="close" onClick={handleClose}>
            <AiFillCloseCircle />
          </button>

          <h1>Adicionar disciplinas</h1>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Select
              isMulti
              optionsMessage="Disciplina não encontrada"
              options={disciplinas}
              placeholder="Selecione uma disciplina"
              name="disciplinas"
            />
            <Button color="primary">Adicionar disciplina</Button>
          </Form>
        </Container>
      )}
      {...rest}
    />
  )
}
