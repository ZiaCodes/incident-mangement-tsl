import React from 'react'
import ThemeProvider from './ThemeProvider'
import AuthProvider from './AuthProvider'
import TicketProvider from './TicketProvider'
import CreateTicketProvider from './CreateTicketProvider'

const ContextProvider = ({children}) => {
  return (
    <AuthProvider>
      <TicketProvider>
        <CreateTicketProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </CreateTicketProvider>
      </TicketProvider>
    </AuthProvider>
  )
}

export default ContextProvider