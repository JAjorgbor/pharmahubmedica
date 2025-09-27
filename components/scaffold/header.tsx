'use client'

import PhoneNumberDisplay from '@/components/scaffold/phone-number-display'
import Sidebar from '@/components/scaffold/sidebar'
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Tooltip,
} from '@heroui/react'
import Image from 'next/image'
import { LuChevronDown } from 'react-icons/lu'

const Header = () => {
  return (
    <>
      <div className="pt-3 md:hidden" />
      <Navbar
        className="max-w-[95%] md:max-w-6xl md:static mx-auto rounded-xl top-3 border-b-gray-300 "
        classNames={{ wrapper: 'max-w-full' }}
      >
        {/* <div className="flex justify-between gap-4 border-b max-w-6xl mx-auto items-center px-5 py-3"> */}
        <NavbarContent className="flex gap-3 items-center">
          <NavbarItem>
            <Sidebar />
          </NavbarItem>
          <NavbarBrand>
            <Image
              src="/png-transparent-logo.png"
              height={80}
              width={200}
              alt="logo"
              className="w-40"
            />
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="flex gap-4 items-center" justify="end">
          <NavbarItem>
            <PhoneNumberDisplay className="hidden md:flex" />
          </NavbarItem>
          <NavbarItem>
            <div className="flex gap-2">
              <Button
                size="sm"
                color="primary"
                variant="light"
                className="font-semibold"
              >
                Sign In
              </Button>
              <Button size="sm" color="primary">
                Sign Up
              </Button>
            </div>
          </NavbarItem>
        </NavbarContent>
        {/* </div> */}
      </Navbar>
      <Navbar
        className="hidden md:block max-w-6xl mx-auto rounded-xl top-3"
        classNames={{ wrapper: 'max-w-full' }}
      >
        <NavbarContent className="flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/home">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Tooltip
              content={
                <div className="flex flex-col max-h-52 flex-wrap gap-2">
                  {Array(20)
                    .fill(null)
                    .map((_, index) => (
                      <Link
                        href="#"
                        key={index}
                        className="px-2 py-1 text-foreground-500 text-sm hover:bg-foreground-100 hover:text-primary transition-colors rounded-lg min-w-36"
                      >
                        Link {index}
                      </Link>
                    ))}
                </div>
              }
            >
              <Link
                aria-current="page"
                href="/collections"
                className="flex gap-1 items-center"
              >
                Collections <LuChevronDown size={15} />
              </Link>
            </Tooltip>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/about">
              About Us
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/contact">
              Contact Us
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  )
}
export default Header
