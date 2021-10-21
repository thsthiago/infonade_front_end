import { PopupMessage } from '../../hooks/usePopup'
import { Container } from './styles'
import { useTransition } from 'react-spring'
import { Popup } from './Popup'

interface PopupContainerProps {
  messages: PopupMessage[]
}

export const PopupContainer = ({ messages }: PopupContainerProps) => {
  const transition = useTransition(messages, {
    keys: (message) => message.id,
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 }
  })

  return (
    <Container>
      {transition((style, item) => (
        <Popup style={style} message={item} />
      ))}
    </Container>
  )
}
