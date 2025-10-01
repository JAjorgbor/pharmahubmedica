'use client'
import { useScroll } from 'framer-motion'
import PhoneNumberDisplay from '@/components/scaffold/phone-number-display'
import MobileMenu from '@/components/scaffold/mobile-menu'
import {
  Badge,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Tooltip,
} from '@heroui/react'
import Image from 'next/image'
import { LuChevronDown, LuShoppingCart } from 'react-icons/lu'
import { useEffect, useState } from 'react'
import { cn } from '@/utils/cn'
import Link from 'next/link'

const Header = () => {
  const { scrollY } = useScroll() // reactive MotionValue
  const [scrollHeight, setScrollHeight] = useState(0)

  useEffect(() => {
    // subscribe to changes
    return scrollY.on('change', (latest) => {
      setScrollHeight(latest)
    })
  }, [scrollY])
  return (
    <>
      <div className="pt-3 md:hidden" />
      <Navbar
        className={cn(
          'max-w-[93%] md:static md:max-w-6xl mx-auto rounded-xl top-3 border-b-gray-300',
          scrollHeight > 80 ? 'shadow-lg' : ''
        )}
        classNames={{ wrapper: 'max-w-full' }}
      >
        {/* <div className="flex justify-between gap-4 border-b max-w-6xl px-5  mx-auto items-center px-5 py-3"> */}
        <NavbarContent className="flex gap-3 items-center">
          <NavbarItem>
            <MobileMenu />
          </NavbarItem>
          <NavbarBrand>
            <Link href="/">
              <Image
                src="/png-transparent-logo.png"
                height={80}
                width={200}
                alt="logo"
                className="w-40"
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="flex gap-4 items-center" justify="end">
          <NavbarItem>
            <PhoneNumberDisplay className="hidden md:flex" />
          </NavbarItem>
          <NavbarItem className="md:hidden">
            <Badge content={2} color="danger">
              <Link
                href="/cart"
                className="bg-white rounded-xl p-1.5 hover:text-primary shadow text-foreground-600"
              >
                <LuShoppingCart size={18} />
              </Link>
            </Badge>
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
      <hr className="border-foreground-300 max-w-6xl px-5 mx-auto" />
      <Navbar
        className={cn(
          'hidden md:block mx-auto rounded-xl top-3 transition-all duration-400 ease-in-out',
          scrollHeight > 100 ? 'shadow-lg max-w-5xl' : 'max-w-6xl '
        )}
        classNames={{
          base: 'max-w-6xl px-5',
          wrapper: 'max-w-full',
        }}
      >
        <NavbarContent className="flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/">
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
                className="flex gap-1 items-center text-primary"
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
        <NavbarContent justify="end">
          <NavbarItem>
            <Badge content={2} color="danger">
              <Link
                href="/cart"
                className="bg-white rounded-xl p-1.5 hover:text-primary shadow text-foreground-600"
              >
                <LuShoppingCart size={18} />
              </Link>
            </Badge>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  )
}
export default Header
