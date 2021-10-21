import React, { createContext, useCallback, useContext, useState } from 'react'
import { v4 } from 'uuid'
import { PopupContainer } from '../components/PopupContainer'

export interface PopupMessage {
  id: string
  type?: 'success' | 'error' | 'info'
  title: string
  description?: string
}

interface PopupContextData {
  addPopup(message: Omit<PopupMessage, 'id'>): void
  removePopup(id: string): void
}

const PopupContext = createContext<PopupContextData>({} as PopupContextData)

const PopupProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<PopupMessage[]>([])

  const addPopup = useCallback(
    ({ type, title, description }: Omit<PopupMessage, 'id'>) => {
      const id = v4()

      const toast = {
        id,
        type,
        title,
        description
      }

      setMessages((state) => [...state, toast])
    },
    []
  )

  const removePopup = useCallback((id: string) => {
    setMessages((state) => state.filter((message) => id !== message.id))
  }, [])

  return (
    <PopupContext.Provider value={{ addPopup, removePopup }}>
      {children}
      <PopupContainer messages={messages} />
    </PopupContext.Provider>
  )
}

function usePopup(): PopupContextData {
  const context = useContext(PopupContext)

  if (!context) {
    throw new Error('useToast must be used withing a ToastProvider')
  }

  return context
}

export { PopupProvider, usePopup }
