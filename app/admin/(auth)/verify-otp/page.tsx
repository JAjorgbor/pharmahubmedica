import { Metadata } from 'next'
import VerifyOtpForm from '@/components/sections/admin/auth/VerifyOtpForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Verify OTP | PharmaHub Medica',
  description: 'Verify your identity with OTP',
}

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-10 text-gray-500 font-medium">
          Loading verification...
        </div>
      }
    >
      <VerifyOtpForm />
    </Suspense>
  )
}
