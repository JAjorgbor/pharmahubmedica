'use client'
import * as React from 'react'

import { HeroUIProvider } from '@heroui/system'
import { ToastProvider } from '@heroui/react'
import { Provider } from 'react-redux'
import { store } from '@/features/store'

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Provider store={store}>
        <HeroUIProvider>
          <ToastProvider
            regionProps={{ classNames: { base: 'z-[999]' } }}
            placement="top-center"
          />

          {children}
        </HeroUIProvider>
      </Provider>
    </>
  )
}

export default Providers
