'use client'
import { useScroll } from 'framer-motion'
import PhoneNumberDisplay from '@/components/scaffold/phone-number-display'
import MobileMenu from '@/components/scaffold/mobile-menu'
import {
  Avatar,
  Badge,
  Button,
  Chip,
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
import { useAppDispatch, useAppSelector } from '@/features/store'
import { setOpenSidebar } from '@/features/sidebarSlice'
import useGetAdminUser from '@/hooks/requests/admin/useGetAdminUser'
import { Skeleton } from '@heroui/react'
import LogoutConfirmationModal from './logout-confirmation-modal'

export const UserPanel = () => {
  const { adminUser, adminUserLoading } = useGetAdminUser()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Avatar size="sm" className="cursor-pointer" />
        </DropdownTrigger>
        <DropdownMenu
          topContent={
            adminUserLoading ? (
              <div className="space-y-1 py-2 bg-foreground-100 rounded-xl p-2 space-x-2">
                <Skeleton className="h-4 w-2/5 rounded-lg inline-block" />
                <Skeleton className="h-4 w-1/3 rounded-lg inline-block" />
                <Skeleton className="h-4 w-5/6 rounded-lg block" />
              </div>
            ) : (
              <div className="py-2 bg-foreground-100 rounded-xl p-2">
                <Chip
                  className="text-xs"
                  classNames={{ base: 'py-0.5 h-5' }}
                  variant="flat"
                  color="primary"
                  size="sm"
                  radius="lg"
                >
                  Admin
                </Chip>
                <p>
                  {adminUser?.firstName} {adminUser?.lastName}
                </p>
                <p className="text-sm text-foreground-500">
                  {adminUser?.email}
                </p>
              </div>
            )
          }
        >
          <DropdownSection showDivider>
            <DropdownItem
              key="name"
              startContent={<LuLayoutDashboard />}
              variant="flat"
              color="primary"
              as={Link}
              href="/admin/dashboard"
            >
              Dashboard
            </DropdownItem>
            <DropdownItem
              as={Link}
              href="/admin/settings"
              key="settings"
              startContent={<LuSettings />}
              variant="flat"
              color="primary"
            >
              Settings
            </DropdownItem>
          </DropdownSection>
          <DropdownItem
            key="logout"
            color="danger"
            variant="flat"
            startContent={<LuLogOut />}
            onPress={() => setIsLogoutModalOpen(true)}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        setIsOpen={setIsLogoutModalOpen}
      />
    </>
  )
}

const AdminHeader = () => {
  const { scrollY } = useScroll() // reactive MotionValue
  const [scrollHeight, setScrollHeight] = useState(0)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  const dispatch = useAppDispatch()
  const { title } = useAppSelector((state) => state.header)

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
        classNames={{
          base: cn(
            'w-[calc(100%-40px)] mx-auto rounded-xl top-3 transition-all duration-300 ease-in-out px-5',
            scrollHeight > 100
              ? 'md:max-w-4xl shadow-lg'
              : 'md:max-w-[77.5rem] bg-white shadow',
          ),
          wrapper: 'max-w-full px-0',
        }}
      >
        {/* <div className="flex justify-between gap-4 border-b max-w-7xl px-5  mx-auto items-center px-5 py-3"> */}
        <NavbarContent className="flex gap-3 items-center">
          <NavbarBrand className="flex gap-4 items-center">
            <button
              className="p-1 md:hidden rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer"
              onClick={() => dispatch(setOpenSidebar(true))}
            >
              <LuMenu size={20} />
            </button>
            <h1 className="text-xl font-semibold text-primary">
              {hydrated ? title : 'Dashboard'}
            </h1>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="flex gap-6 items-center" justify="end">
          <NavbarItem>
            <UserPanel />
          </NavbarItem>
        </NavbarContent>
        {/* </div> */}
      </Navbar>
    </>
  )
}
export default AdminHeader
