import React, { createContext, useCallback, useContext, useState } from 'react'

interface ISearchContextData {
  searchGlobal: string
  handleSearch(value: string): void
  clear: () => void
}

const SearchContext = createContext<ISearchContextData>(
  {} as ISearchContextData
)

const SearchProvider: React.FC = ({ children }) => {
  const [searchGlobal, setSearchGlobal] = useState('')

  const clear = () => {
    setSearchGlobal('')
  }

  const handleSearch = (value: string) => {
    setSearchGlobal(value)
  }

  return (
    <SearchContext.Provider value={{ searchGlobal, handleSearch, clear }}>
      {children}
    </SearchContext.Provider>
  )
}

function useSearch(): ISearchContextData {
  const context = useContext(SearchContext)

  if (!context) {
    throw new Error('useSearch must be used withing a ToastProvider')
  }

  return context
}

export { SearchProvider, useSearch }
