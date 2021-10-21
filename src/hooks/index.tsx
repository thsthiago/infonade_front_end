import { ReactNode } from 'react'
import { PopupProvider } from './usePopup'

interface IAppProvider {
  children: ReactNode
}

const AppProvider = ({ children }: IAppProvider) => (
  <PopupProvider>{children}</PopupProvider>
)

export default AppProvider
