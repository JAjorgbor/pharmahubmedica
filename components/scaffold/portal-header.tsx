'use client'
import { useScroll } from 'framer-motion'
import PhoneNumberDisplay from '@/components/scaffold/phone-number-display'
import MobileMenu from '@/components/scaffold/mobile-menu'
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Tooltip,
} from '@heroui/react'
import Image from 'next/image'
import {
  LuChevronDown,
  LuLayoutDashboard,
  LuLogOut,
  LuMenu,
  LuSettings,
  LuShoppingCart,
} from 'react-icons/lu'
import { useEffect, useState } from 'react'
import { cn } from '@/utils/cn'
import Link from 'next/link'

export const UserPanel = () => {
  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Avatar size="sm" />
        </DropdownTrigger>
        <DropdownMenu
          topContent={
            <div className="space-y-1 py-2 bg-foreground-100 rounded-xl p-2">
              Anastasia Oghenebrohien
              <p className="text-sm text-foreground-500">anastasia@email.com</p>
            </div>
          }
        >
          <DropdownSection showDivider>
            <DropdownItem
              key="name"
              startContent={<LuLayoutDashboard />}
              variant="flat"
              color="primary"
              as={Link}
              href="/portal/dashboard"
            >
              Dashboard
            </DropdownItem>
            <DropdownItem
              as={Link}
              href="/portal/settings"
              key="settings"
              startContent={<LuSettings />}
              variant="flat"
              color="primary"
            >
              Profile Settings
            </DropdownItem>
          </DropdownSection>
          <DropdownItem
            key="logout"
            color="danger"
            variant="flat"
            startContent={<LuLogOut />}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}

const PortalHeader = () => {
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
      <div className="pt-3" />
      <Navbar
        className={cn(
          'max-w-[93%] mx-auto rounded-xl top-3 transition-all duration-300 ease-in-out',
          scrollHeight > 100
            ? 'md:max-w-4xl shadow-lg'
            : 'md:max-w-[1240px] bg-white shadow'
        )}
        classNames={{ wrapper: 'max-w-full' }}
      >
        {/* <div className="flex justify-between gap-4 border-b max-w-7xl px-5  mx-auto items-center px-5 py-3"> */}
        <NavbarContent className="flex gap-3 items-center">
          <NavbarBrand className="flex gap-4 items-center">
            <button className="p-1 md:hidden rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer">
              <LuMenu size={20} />
            </button>
            <h1 className="text-xl font-semibold text-primary">Dashboard</h1>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="flex gap-6 items-center" justify="end">
          <NavbarItem>
            <PhoneNumberDisplay className="hidden md:flex" />
          </NavbarItem>
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
          <NavbarItem>
            <UserPanel />
          </NavbarItem>
        </NavbarContent>
        {/* </div> */}
      </Navbar>
    </>
  )
}
export default PortalHeader
