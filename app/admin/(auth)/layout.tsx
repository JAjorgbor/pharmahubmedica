import type { FC, ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col items-center">
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
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        {children}
      </div>
      <p className="mt-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} PharmaHub Medica. All rights reserved.
      </p>
    </div>
  )
}

export default AuthLayout
