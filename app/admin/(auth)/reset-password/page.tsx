import { Metadata } from 'next'
import ResetPasswordForm from '@/components/sections/admin/auth/ResetPasswordForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Reset Password | PharmaHub Medica',
  description: 'Set a new password for your admin account',
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-10 text-gray-500 font-medium">
          Loading reset form...
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  )
}
