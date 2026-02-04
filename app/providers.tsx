'use client'
import * as React from 'react'

import { HeroUIProvider } from '@heroui/system'
import { ToastProvider } from '@heroui/react'
import { useSearchParams } from 'next/navigation'

function Providers({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  React.useEffect(() => {
    if (searchParams?.get('code')) {
      localStorage.setItem('referralCode', searchParams.get('code')!)
    }
  }, [searchParams])
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
