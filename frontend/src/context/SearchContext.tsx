import React, { createContext, useState } from 'react'

export const SearchContext = createContext(null as any)

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<string[]>([])
  return <SearchContext.Provider value={{ history, setHistory }}>{children}</SearchContext.Provider>
}