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
            <div className="space-y-1 py-2 bg-foreground-50 rounded-xl p-2">
              Anastasia Oghenebrohien
              <p className="text-sm text-foreground-500">anastasia@email.com</p>
            </div>
          }
        >
          <DropdownSection showDivider>
            <DropdownItem
              key="name"
              startContent={<LuLayoutDashboard />}
              variant="faded"
              color="primary"
            >
              Dashboard
            </DropdownItem>
            <DropdownItem
              key="settings"
              startContent={<LuSettings />}
              variant="faded"
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
      <div className="pt-3 " />
      <Navbar
        className={cn(
          'mx-auto rounded-xl top-3 transition-all duration-300 ease-in-out',
          scrollHeight > 100
            ? 'max-w-5xl shadow-lg'
            : 'max-w-[1220px] bg-white shadow'
        )}
        classNames={{ wrapper: 'max-w-full' }}
      >
        {/* <div className="flex justify-between gap-4 border-b max-w-7xl px-5  mx-auto items-center px-5 py-3"> */}
        <NavbarContent className="flex gap-3 items-center">
          <NavbarBrand>
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
