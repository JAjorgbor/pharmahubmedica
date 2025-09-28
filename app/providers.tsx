'use client'
import * as React from 'react'

// 1. import `HeroUIProvider` component
import { HeroUIProvider } from '@heroui/system'
import { ToastProvider } from '@heroui/react'

function Providers({ children }: { children: React.ReactNode }) {
  // 2. Wrap HeroUIProvider at the root of your app
  return (
    <>
      <HeroUIProvider>
        <ToastProvider />

        {children}
      </HeroUIProvider>
    </>
  )
}

export default Providers
