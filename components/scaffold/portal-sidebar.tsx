'use client'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'

import React, { ReactElement, ReactNode, useState } from 'react'
import {
  LuChevronLeft,
  LuChevronRight,
  LuHandshake,
  LuHouse,
  LuLayoutDashboard,
  LuLayoutList,
} from 'react-icons/lu'
import Link from 'next/link'
import Image from 'next/image'

const PortalSidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [toggled, setToggled] = useState(true)
  return (
    <Sidebar
      className="relative"
      collapsed={collapsed}
      onBackdropClick={() => setToggled(false)}
      toggled={toggled}
      rootStyles={{
        height: '100vh',
        position: 'sticky',
        top: 0,
        left: 0,
        // boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
      }}
    >
      <Menu className="bg-white h-[92%] ">
        <MenuItem
          icon={
            !collapsed ? (
              <Image
                src="/logo-mark.png"
                height={40}
                width={40}
                alt="logo"
                className="w-8 rounded-lg"
              />
            ) : (
              <button
                type="button"
                className="p-2 rounded-full hover:bg-foreground-100 cursor-pointer"
              >
                <LuChevronRight size={20} />
              </button>
            )
          }
          onClick={() => setCollapsed(!collapsed)}
          suffix={
            <button
              type="button"
              className="p-2 rounded-full hover:bg-foreground-100 cursor-pointer"
            >
              <LuChevronLeft size={20} />
            </button>
          }
          className="py-2 !bg-white hover:!bg-white border-b border-b-foreground-200"
        >
          <span className="text-primary font-semibold text-lg">
            User Portal
          </span>
        </MenuItem>
        {/* <SubMenu label="Charts">
          <MenuItem> Pie charts </MenuItem>
          <MenuItem> Line charts </MenuItem>
        </SubMenu> */}
        <MenuItem
          icon={<LuLayoutDashboard />}
          component={<Link href="/portal/dashboard" />}
        >
          {' '}
          Dashboard{' '}
        </MenuItem>
        <MenuItem
          icon={<LuLayoutList />}
          component={<Link href="/portal/orders" />}
        >
          {' '}
          Orders{' '}
        </MenuItem>
        <MenuItem
          icon={<LuHandshake />}
          component={<Link href="/portal/referrals" />}
        >
          {' '}
          Referrals
        </MenuItem>
      </Menu>
      <Menu className="border-t border-t-foreground-200 bg-white h-[8%]">
        <MenuItem
          icon={<LuHouse size={20} />}
          className="text-foreground-500"
          component={<Link href="/" />}
        >
          Back to Store
        </MenuItem>
      </Menu>
    </Sidebar>
  )
}

export default PortalSidebar
