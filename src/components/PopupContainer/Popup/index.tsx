import React, { useEffect } from 'react'
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi'
import { PopupMessage, usePopup } from '../../../hooks/usePopup'
import { Container } from './styles'

interface PopupProps {
  message: PopupMessage
  style: object
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />
}

export const Popup = ({ message, style }: PopupProps) => {
  const { removePopup } = usePopup()

  useEffect(() => {
    const timer = setTimeout(() => {
      removePopup(message.id)
    }, 6000)

    return () => {
      clearTimeout(timer)
    }
  }, [removePopup, message.id])

  return (
    <Container
      type={message.type}
      hasdescription={String(!!message.description)}
      style={style}>
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button onClick={() => removePopup(message.id)} type="button">
        <FiXCircle size={18} />
      </button>
      <span></span>
    </Container>
  )
}
