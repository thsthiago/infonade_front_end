import { ReactNode } from 'react'
import { PopupProvider } from './usePopup'
import { SearchProvider } from './useSearch'

interface IAppProvider {
  children: ReactNode
}

const AppProvider = ({ children }: IAppProvider) => (
  <PopupProvider>
    <SearchProvider>{children}</SearchProvider>
  </PopupProvider>
)

export default AppProvider
