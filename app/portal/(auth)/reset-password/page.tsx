import ResetPasswordForm from '@/components/portal/auth/ResetPasswordForm'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset your password for the PharmaHub Medica portal',
}

export default function ResetPasswordPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8">
        <div className="lg:hidden flex justify-center ">
          <Link href="/">
            <Image
              src="/png-transparent-logo.png"
              alt="PharmaHub Medica Logo"
              width={200}
              height={100}
              className="w-auto"
              priority
            />
          </Link>
        </div>

        <div className="space-y-3 text-center flex flex-col items-center justify-center lg:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Set New Password
          </h2>
          <p className="text-foreground-500">
            Enter a new password to regain access to your portal
          </p>
        </div>

        <Suspense>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  )
}
