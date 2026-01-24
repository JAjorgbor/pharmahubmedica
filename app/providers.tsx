'use client'
import * as React from 'react'

import { HeroUIProvider } from '@heroui/system'
import { ToastProvider } from '@heroui/react'

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
