import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'

import Header from '@/components/Header'
import { AppProvider } from '@/providers/AppProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blog Post',
  description: 'blog post description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} text-primary-foreground bg-primary relative mx-auto mb-20 flex w-full max-w-screen-xl min-h-screen overflow-hidden flex-col px-[10vw] md:px-[5vw]`}
        suppressHydrationWarning
      >
        <AppProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Toaster richColors />
        </AppProvider>
      </body>
    </html>
  )
}
