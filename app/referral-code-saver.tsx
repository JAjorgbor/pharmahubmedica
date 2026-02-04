'use client'
import { useSearchParams } from 'next/navigation'
import * as React from 'react'

const ReferralCodeSaver = () => {
  const searchParams = useSearchParams()
  React.useEffect(() => {
    if (searchParams?.get('code')) {
      localStorage.setItem('referralCode', searchParams.get('code')!)
    }
  }, [searchParams])
  return null
}
export default ReferralCodeSaver
