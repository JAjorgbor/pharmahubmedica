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
  Spinner,
  Tooltip,
} from '@heroui/react'
import Image from 'next/image'
import { LuArrowRight, LuChevronDown, LuShoppingCart } from 'react-icons/lu'
import { useEffect, useState } from 'react'
import { cn } from '@/utils/cn'
import Link from 'next/link'
import useGetCategories from '@/hooks/requests/useGetCategories'
import useCart from '@/hooks/useCart'
import useGetPortalUser from '@/hooks/requests/useGetPortalUser'
import { UserPanel } from '@/components/scaffold/portal-header'

const Header = () => {
  const { scrollY } = useScroll() // reactive MotionValue
  const [scrollHeight, setScrollHeight] = useState(0)

  useEffect(() => {
    // subscribe to changes
    return scrollY.on('change', (latest) => {
      setScrollHeight(latest)
    })
  }, [scrollY])
  const { categoriesData, categoriesLoading } = useGetCategories({
    params: { page: 1, limit: 10 },
  })
  const { categories, meta } = categoriesData || {}
  const { items } = useCart()
  const { portalUser } = useGetPortalUser()
  return (
    <>
      <div className="pt-5 md:hidden" />
      <Navbar
        classNames={{
          base: cn(
            'w-[calc(100%-40px)] mx-auto rounded-xl top-3 transition-all duration-300 ease-in-out px-5',
            scrollHeight > 100 && 'max-w-4xl shadow-lg',
            'md:max-w-7xl md:relative md:backdrop-blur-none md:shadow-none',
          ),
          wrapper: 'max-w-full px-0',
        }}
      >
        {/* <div className="flex justify-between gap-4 border-b max-w-7xl px-5  mx-auto items-center px-5 py-3"> */}
        <NavbarContent className="flex gap-3 items-center">
          <NavbarItem>
            <MobileMenu />
          </NavbarItem>
          <NavbarBrand>
            <Link href="/">
              <Image
                src="/logo-mark.png"
                height={30}
                width={80}
                alt="logo"
                className="w-8 rounded-lg md:hidden"
              />
              <Image
                src="/png-transparent-logo.png"
                height={80}
                width={200}
                alt="logo"
                className="w-40 hidden md:-ml-6 md:inline-block"
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="flex gap-4 items-center" justify="end">
          <NavbarItem>
            <PhoneNumberDisplay className="hidden md:flex" />
          </NavbarItem>
          <NavbarItem className="md:hidden">
            <Badge content={items.length || undefined} color="danger">
              <Link
                href="/cart"
                className="bg-white rounded-xl p-1.5 hover:text-primary shadow text-foreground-600"
              >
                <LuShoppingCart size={18} />
              </Link>
            </Badge>
          </NavbarItem>
          <NavbarItem>
            {portalUser ? (
              <UserPanel />
            ) : (
              <div className="flex gap-2">
                <Button
                  as={Link}
                  href={'/portal'}
                  size="sm"
                  color="primary"
                  variant="light"
                  className="font-semibold"
                >
                  Sign In
                </Button>
                <Button
                  as={Link}
                  href={'/portal/create-account'}
                  size="sm"
                  color="primary"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </NavbarItem>
        </NavbarContent>
        {/* </div> */}
      </Navbar>
      <hr className="border-foreground-300 max-w-7xl px-5 mx-auto z-40 relative my-3" />
      <Navbar
        className={cn(
          'hidden md:block mx-auto rounded-xl top-3 transition-all duration-300 ease-in-out px-5',
          scrollHeight > 100 ? 'shadow-lg max-w-4xl' : 'max-w-7xl ',
        )}
        classNames={{
          wrapper: 'max-w-full px-0',
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
                categoriesLoading ? (
                  <Spinner title="Fetching collections..." />
                ) : (
                  <div className="flex flex-col max-h-52 flex-wrap gap-2">
                    {categories?.map((each, index) => (
                      <Link
                        href={`/collections/${each?.slug}`}
                        key={index}
                        className="px-2 py-1 text-foreground-500 text-sm hover:bg-foreground-100 hover:text-primary transition-colors rounded-lg min-w-36 truncate"
                      >
                        {each?.name}
                      </Link>
                    ))}
                    <Link
                      href={`/collections`}
                      className="px-2 py-1 text-sm hover:bg-foreground-100 text-primary transition-colors rounded-lg min-w-36 flex gap-2 items-center"
                    >
                      View All <LuArrowRight size={15} />
                    </Link>
                  </div>
                )
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
            <Badge content={items.length || undefined} color="danger">
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
