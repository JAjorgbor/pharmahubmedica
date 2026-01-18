'use client'
import { Menu, MenuItem, Sidebar, sidebarClasses } from 'react-pro-sidebar'

import { setOpenSidebar } from '@/features/sidebarSlice'
import { useAppDispatch, useAppSelector } from '@/features/store'
import useMediaQuery from '@/hooks/useMediaQuery'
import { theme } from '@/library/config'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  LuChevronLeft,
  LuChevronRight,
  LuHandshake,
  LuHouse,
  LuLayoutDashboard,
  LuLayoutList,
  LuSettings,
} from 'react-icons/lu'
import useGetPortalUser from '@/hooks/requests/useGetPortalUser'

const PortalSidebar = () => {
  const isMobile = useMediaQuery('md')
  const [collapsed, setCollapsed] = useState(false)
  const { openSidebar } = useAppSelector((state) => state.sidebar)
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    if (!isMobile && openSidebar) dispatch(setOpenSidebar(false))
  }, [isMobile, openSidebar, pathname])

  useEffect(() => {
    dispatch(setOpenSidebar(false))
  }, [pathname])
  useEffect(() => {
    setIsHydrated(true)
  }, [])
  const { portalUser } = useGetPortalUser()
  const isActive = (path: string) => pathname.includes(path)

  return (
    isHydrated && (
      <Sidebar
        collapsed={!isMobile && collapsed}
        onBackdropClick={() => dispatch(setOpenSidebar(false))}
        toggled={openSidebar}
        breakPoint="md"
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            display: 'flex',
            position: 'sticky',
            top: '0',
            flexDirection: 'column',
            height: '100dvh', // force full height
            overflow: 'hidden', // prevent scrollbars
            background: 'white',
          },
        }}
        collapsedWidth="60px"
      >
        <Menu
          className=""
          menuItemStyles={{
            root: {
              paddingX: '5px',
              backgroundColor: 'transparent',
              ['&hover']: { backgroundColor: 'transparent' },
            },

            button: {
              backgroundColor: 'transparent',
              padding: '10px 12px',
              ['&hover']: { backgroundColor: 'transparent' },
            },
          }}
        >
          <MenuItem
            icon={
              !isMobile ? (
                !collapsed ? (
                  <Image
                    src="/logo-mark.png"
                    height={40}
                    width={40}
                    alt="logo"
                    className="w-8 rounded-lg ml-4"
                  />
                ) : (
                  <button
                    type="button"
                    className="p-2 rounded-full hover:bg-foreground-100 cursor-pointer"
                  >
                    <LuChevronRight size={20} />
                  </button>
                )
              ) : (
                <Image
                  src="/logo-mark.png"
                  height={40}
                  width={40}
                  alt="logo"
                  className="w-8 rounded-lg ml-4"
                />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
            suffix={
              !isMobile && (
                <button
                  type="button"
                  className="p-2 rounded-full hover:bg-foreground-100 cursor-pointer"
                >
                  <LuChevronLeft size={20} />
                </button>
              )
            }
            className="py-2 bg-white! hover:bg-white! border-b border-b-foreground-200"
          >
            <span className="text-primary font-semibold text-lg">
              User Portal
            </span>
          </MenuItem>
        </Menu>
        <Menu
          className="flex-1 overflow-y-auto"
          menuItemStyles={{
            root: {
              padding: '5px',
            },
            button: {
              padding: '10px 5px',
              height: '40px',
              borderRadius: '10px',
              transition: 'all 0.1s ease-in-out',
              ['&.active, &.ps-active']: {
                backgroundColor: theme.colors.primary,
                color: 'white',
              },
            },
          }}
        >
          {/* <SubMenu label="Charts">
          <MenuItem> Pie charts </MenuItem>
          <MenuItem> Line charts </MenuItem>
        </SubMenu> */}
          <MenuItem
            icon={<LuLayoutDashboard />}
            component={<Link href="/portal/dashboard" />}
            className="text-foreground-600"
            active={isActive('/portal/dashboard')}
          >
            {' '}
            Dashboard{' '}
          </MenuItem>
          <MenuItem
            icon={<LuLayoutList />}
            component={<Link href="/portal/orders" />}
            className="text-foreground-600"
            active={isActive('/portal/orders')}
          >
            {' '}
            Orders{' '}
          </MenuItem>
          {portalUser?.isReferralPartner && (
            <MenuItem
              icon={<LuHandshake />}
              component={<Link href="/portal/referrals" />}
              className="text-foreground-600"
              active={isActive('/portal/referrals')}
            >
              {' '}
              Referrals
            </MenuItem>
          )}
          <MenuItem
            icon={<LuSettings />}
            component={<Link href="/portal/settings" />}
            className="text-foreground-600"
            active={isActive('/portal/settings')}
          >
            {' '}
            Settings
          </MenuItem>
        </Menu>
        <Menu
          className="border-t border-t-foreground-200 mt-auto"
          menuItemStyles={{
            root: {
              padding: '5px',
            },
            button: {
              padding: '10px 5px',
              height: '40px',
              borderRadius: '10px',
              transition: 'all 0.1s ease-in-out',
              ['&:hover']: {
                backgroundColor: theme.colors.primary,
                color: 'white',
              },
            },
          }}
        >
          <MenuItem
            icon={<LuHouse size={20} />}
            className="text-foreground-600"
            component={<Link href="/" />}
          >
            Back to Store
          </MenuItem>
        </Menu>
      </Sidebar>
    )
  )
}

export default PortalSidebar
