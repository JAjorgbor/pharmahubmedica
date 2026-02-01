'use client'
import { Card, CardBody } from '@heroui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, type FC, type ReactNode } from 'react'
import { getDomain } from 'tldts'

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const [rootDomain, setRootDomain] = useState('/')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRootDomain(`https://${getDomain(window.location.hostname)}`)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center mb-6">
        <Link href={rootDomain || '/'}>
          <Image
            src="/png-transparent-logo.png"
            alt="PharmaHub Medica Logo"
            width={180}
            height={100}
            className="w-auto"
            priority
          />
        </Link>
      </div>
      <Card className="max-w-sm w-full mx-auto">
        <CardBody className="p-6">{children}</CardBody>
      </Card>
      <p className="mt-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} PharmaHub Medica. All rights reserved.
      </p>
    </div>
  )
}

export default AuthLayout
