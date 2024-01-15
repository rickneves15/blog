'use client'

import { ReactNode } from 'react'
import { QueryClientProvider } from 'react-query'

import { queryClient } from '@/lib/reactQuery'

type ReactQueryProviderProps = {
  children: ReactNode
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
