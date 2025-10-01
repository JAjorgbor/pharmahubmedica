'use client'

import { Accordion, AccordionItem } from '@heroui/react'
import Link from 'next/link'
import * as React from 'react'
import { LuMenu, LuX } from 'react-icons/lu'
import { Drawer } from 'vaul'
import PhoneNumberDisplay from '@/components/scaffold/phone-number-display'
import Image from 'next/image'
import useMediaQuery from '@/hooks/useMediaQuery'

export default function MobileMenu() {
  const isMobile = useMediaQuery('md')
  const [isOpen, setIsOpen] = React.useState(true)
  React.useEffect(() => {
    if (!isMobile && isOpen) setIsOpen(false)
  }, [isMobile, isOpen])
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

        {/* Sidebar Panel */}
        <Drawer.Content className="fixed left-0 top-1/3 bottom-0 z-50 w-full rounded-t-xl bg-white shadow-xl flex flex-col">
          <Drawer.Title className="hidden">Sidebar</Drawer.Title>
          <div className="p-4 ">
            <div className="flex justify-between items-center rounded-xl bg-primary/10 p-2">
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
            <nav className="flex-1 py-4 space-y-2 divide-y divide-foreground-200 text-sm">
              <Link
                href="#"
                className="block rounded-md p-2 hover:bg-gray-100 hover:text-primary"
              >
                Home
              </Link>
              <Link
                href="#"
                className="block rounded-md p-2 hover:bg-gray-100 hover:text-primary"
              >
                Collections{' '}
              </Link>
              <Link
                href="#"
                className="block rounded-md p-2 hover:bg-gray-100 hover:text-primary"
              >
                About Us
              </Link>
              <Link
                href="#"
                className="block rounded-md p-2 hover:bg-gray-100 hover:text-primary"
              >
                Contact Us
              </Link>
            </nav>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
