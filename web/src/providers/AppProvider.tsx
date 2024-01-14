import { ReactNode } from 'react'

import { AuthProvider } from '@/hooks/auth'

import { ReactQueryProvider } from './ReactQueryProvider'

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </AuthProvider>
  )
}
