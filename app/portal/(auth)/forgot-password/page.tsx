import ResetPasswordForm from '@/components/sections/portal/auth/ResetPasswordForm'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Portal Reset Password | PharmaHub Medica',
  description: 'Reset your password for the PharmaHub Medica portal',
}

export default function ForgotPasswordPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8">
        <div className="lg:hidden flex justify-center mb-8">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="PharmaHub Medica Logo"
              width={200}
              height={100}
              className="w-auto"
              priority
            />
          </Link>
        </div>

        <div className="space-y-3 text-center flex flex-col items-center justify-center lg:text-left">
          <h2 className="text-4xl font-bold tracking-tight text-foreground">
            Reset Password
          </h2>
          <p className="text-muted-foreground text-lg">
            Enter a new password to regain access to your portal
          </p>
        </div>

        <div className="rounded-3xl shadow-xl shadow-primary/5 p-2 bg-white">
          <div className="overflow-hidden rounded-3xl">
            <ResetPasswordForm />
          </div>
        </div>
      </div>
    </div>
  )
}
