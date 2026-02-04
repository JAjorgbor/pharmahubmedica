'use client'
import * as React from 'react'

import { ToastProvider } from '@heroui/react'
import { HeroUIProvider } from '@heroui/system'

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeroUIProvider>
        <ToastProvider
          regionProps={{ classNames: { base: 'z-[999]' } }}
          placement="top-center"
        />

        {children}
      </HeroUIProvider>
    </>
  )
}

export default Providers
