import type React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FC, ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-50 p-4 lg:p-6 gap-4 lg:gap-6">
      <div className="hidden lg:flex flex-col justify-between p-12 text-white relative overflow-hidden rounded-3xl shadow-2xl bg-primary">
        <div className="absolute inset-0 z-0">
          <Image
            src="/portal-auth-banner.jpg"
            alt="Nigerian Medical Professional"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-primary/40" />
        </div>

        <div className="z-20 relative">
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

          <div className="space-y-6 max-w-lg">
            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight">
              Your Health, <br />
              <span className="text-secondary-600">Simplified.</span>
            </h1>
            <p className="text-primary-foreground/90 text-xl leading-relaxed">
              Access verified medications, place secure orders, and receive
              timely delivery from trusted pharmaceutical partners.
            </p>
          </div>

          <div className="mt-18 grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-secondary-600">24/7</div>
              <p className="text-sm text-primary-foreground/70">
                Support Access
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-secondary-600">100%</div>
              <p className="text-sm text-primary-foreground/70">
                Secure & Encrypted
              </p>
            </div>
          </div>
        </div>

        <div className="z-10 relative flex items-center gap-6 text-sm opacity-80 mt-auto">
          <span>© 2026 PharmaHub Medica</span>
          <Link
            href="/privacy-policy"
            className="hover:text-primary transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms-and-conditions"
            className="hover:text-primary transition-colors"
          >
            Terms
          </Link>
        </div>
      </div>

      <div>{children}</div>
    </div>
  )
}

export default AuthLayout
