'use client'

import { Accordion, AccordionItem } from '@heroui/react'
import Link from 'next/link'
import * as React from 'react'
import { LuMenu, LuX } from 'react-icons/lu'
import { Drawer } from 'vaul'
import PhoneNumberDisplay from '@/components/scaffold/phone-number-display'
import Image from 'next/image'

export default function Sidebar() {
  return (
    <Drawer.Root direction="left">
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
        <Drawer.Content className="fixed left-0 top-0 bottom-0 z-50 w-64 bg-white shadow-xl flex flex-col">
          <Drawer.Title className="hidden">Sidebar</Drawer.Title>
          <div className="p-2 h-full">
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

              <Accordion className="px-0">
                <AccordionItem
                  classNames={{
                    trigger:
                      'p-0 group rounded-md p-2 hover:bg-gray-100 hover:text-primary',
                    indicator: 'cursor-pointer',
                  }}
                  title={
                    <Link
                      href="#"
                      className="group-hover:text-primary flex justify-between text-sm"
                    >
                      Collections{' '}
                      <span className="text-foreground-300 font-light text-lg">
                        |
                      </span>
                    </Link>
                  }
                >
                  <div className="flex flex-col ml-7 pl-2 border-l border-l-foreground-200 gap-2">
                    {Array(10)
                      .fill(null)
                      .map((_, index) => (
                        <Link
                          href="#"
                          key={index}
                          className="p-1.5 text-foreground-500 text-sm hover:bg-foreground-100 hover:text-primary transition-colors rounded-lg w-full"
                        >
                          Link {index}
                        </Link>
                      ))}
                  </div>
                </AccordionItem>
              </Accordion>
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
          <div className="p-4 mt-auto">
            <PhoneNumberDisplay />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
