import CreateAccountForm from '@/components/portal/auth/CreateAccountForm'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Portal Registration | PharmaHub Medica',
  description:
    'Register to have access to the PharmaHub Medica portal dashboard',
}

export default function CreateAccountPage() {
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
            Create Account
          </h2>
          <p className="text-foreground-500 ">
            Join PharmaHub and take control of your health today
          </p>
        </div>

        <Suspense>
          <CreateAccountForm />
        </Suspense>
      </div>
    </div>
  )
}
