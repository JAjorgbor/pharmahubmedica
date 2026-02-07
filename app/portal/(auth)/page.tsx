import LoginForm from '@/components/portal/auth/LoginForm'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Portal Login',
  description: 'Login to the PharmaHub Medica portal dashboard',
}

export default function LoginPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center md:p-6">
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
            Welcome Back
          </h2>
          <p className="text-foreground-500">
            Enter your credentials to access your portal
          </p>
        </div>

        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
