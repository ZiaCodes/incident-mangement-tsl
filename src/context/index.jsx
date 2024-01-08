import React from 'react'
import ThemeProvider from './ThemeProvider'
import AuthProvider from './AuthProvider'
import TicketProvider from './TicketProvider'

const ContextProvider = ({children}) => {
  return (
    <AuthProvider>
      <TicketProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </TicketProvider>
    </AuthProvider>
  )
}

export default ContextProvider