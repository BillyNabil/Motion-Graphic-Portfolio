import React, { createContext, useContext, useState, ReactNode } from 'react'

interface ActiveSectionContextType {
  activeSection: string
  setActiveSection: (section: string) => void
}

const ActiveSectionContext = createContext<ActiveSectionContextType | undefined>(undefined)

export const useActiveSection = () => {
  const context = useContext(ActiveSectionContext)
  if (!context) {
    throw new Error('useActiveSection must be used within ActiveSectionProvider')
  }
  return context
}

interface ActiveSectionProviderProps {
  children: ReactNode
}

export const ActiveSectionProvider: React.FC<ActiveSectionProviderProps> = ({ children }) => {
  const [activeSection, setActiveSection] = useState('home')

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  )
}