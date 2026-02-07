import { Metadata } from 'next'
import VerifyOtpForm from '@/components/admin/auth/verify-otp-form'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Verify OTP',
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
