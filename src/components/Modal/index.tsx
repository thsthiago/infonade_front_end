import ReactModal, { Props } from 'react-modal'
import { Button } from '../Button'
import { Container, overlay } from './styles'

ReactModal.setAppElement('#root')

interface IModalProps extends Props {
  name: string
  setIsOpen: any
  confirm(): void
}

export const Modal = ({ name, confirm, setIsOpen, ...rest }: IModalProps) => {
  const handleClose = () => {
    setIsOpen({
      isOpen: false,
      fn: undefined
    })
  }

  const handleConfirm = () => {
    confirm()
    handleClose()
  }

  return (
    <ReactModal
      ariaHideApp={true}
      preventScroll={true}
      style={{ overlay: overlay as any }}
      onRequestClose={handleClose}
      contentElement={() => (
        <Container>
          <h1>Confirmação</h1>
          <p>Deseja excluir {name}?</p>
          <div className="boxBtn">
            <Button color="primary" className="cancel" onClick={handleClose}>
              Cancelar
            </Button>
            <Button color="delete" className="confirm" onClick={handleConfirm}>
              Ok
            </Button>
          </div>
        </Container>
      )}
      {...rest}
    />
  )
}
