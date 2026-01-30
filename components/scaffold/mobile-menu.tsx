'use client'

import PhoneNumberDisplay from '@/components/scaffold/phone-number-display'
import useMediaQuery from '@/hooks/useMediaQuery'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { LuMenu, LuX } from 'react-icons/lu'
import { Drawer } from 'vaul'

export default function MobileMenu() {
  const isMobile = useMediaQuery('md')
  const [isOpen, setIsOpen] = React.useState(true)
  const pathname = usePathname()

  React.useEffect(() => {
    if (!isMobile && isOpen) setIsOpen(false)
  }, [isMobile, isOpen, pathname])

  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const isActive = (href: string, startsWith?: boolean) =>
    startsWith ? pathname.startsWith(href) : pathname == href

  return (
    <Drawer.Root direction="bottom" open={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger Button */}
      <Drawer.Trigger asChild>
        <button className="p-1 md:hidden rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer">
          <LuMenu size={20} />
        </button>
      </Drawer.Trigger>

      {/* Overlay */}
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-primary/40 z-40" />

        {/* Mobile Menu Panel */}
        <Drawer.Content className="fixed left-0 top-[45%] sm:top-[60%] bottom-0 z-50 w-full rounded-t-3xl bg-white shadow-xl flex flex-col">
          <Drawer.Title className="hidden">Mobile Menu</Drawer.Title>
          <div className="flex justify-center p-2">
            <div className="bg-foreground-300 rounded-xl p-1 w-14" />
          </div>
          <div className="p-4 ">
            <div className="flex justify-between items-center rounded-2xl bg-foreground-100 p-2">
              <Image
                src="/png-transparent-logo.png"
                height={80}
                width={200}
                alt="logo"
                className="w-40"
              />
              <Drawer.Trigger asChild>
                <button className="p-1 md:hidden rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer">
                  <LuX size={20} />
                </button>
              </Drawer.Trigger>
            </div>
            <nav className="flex-1 py-4 space-y-2 divide-y divide-foreground-200 text-sm ">
              <Link
                href="/"
                className={`${isActive('/') ? 'bg-primary text-white' : ''} block rounded-xl p-2 hover:bg-gray-100 hover:text-primary`}
              >
                Home
              </Link>
              <Link
                href="/collections"
                className={`${isActive('/collections', true) ? 'bg-primary text-white' : ''} block rounded-xl p-2 hover:bg-gray-100 hover:text-primary`}
              >
                Collections{' '}
              </Link>
              <Link
                href="/about"
                className={`${isActive('/about') ? 'bg-primary text-white' : ''} block rounded-xl p-2 hover:bg-gray-100 hover:text-primary`}
              >
                About Us
              </Link>
              <Link
                href="contact"
                className={`${isActive('contact"') ? 'bg-primary text-white' : ''} block rounded-xl p-2 hover:bg-gray-100 hover:text-primary`}
              >
                Contact Us
              </Link>
            </nav>
            <PhoneNumberDisplay />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
