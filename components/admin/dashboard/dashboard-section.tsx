'use client'
import StatCard from '@/components/admin/dashboard/stat-card'
import { IoCashOutline } from 'react-icons/io5'
import React from 'react'
import { currencyFormatter } from '@/utils/currencyFormatter'
import { LuEye, LuPackage, LuShoppingBag, LuUsers } from 'react-icons/lu'
import { Button } from '@heroui/react'
import RecentOrders from '@/components/admin/dashboard/recent-orders'
import TopReferralPartners from '@/components/admin/dashboard/top-referral-partners'

const DashboardSection = () => {
  return (
    <div className="p-5 max-w-7xl mx-auto space-y-5">
      <div className="flex justify-between items-center gap-4">
        <div className="space-y-0.5">
          <h1 className="text-3xl text-primary font-bold">Welcome back!</h1>
          <p className="text-foreground-500 text-sm">
            Here&apos;s an overview of your platform&apos;s latest activity and
            insights.
          </p>
        </div>
        <Button
          size="sm"
          variant="ghost"
          startContent={<LuEye size={15} />}
          className="hidden md:flex"
        >
          View Store
        </Button>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
        <StatCard
          title="Total Revenue"
          icon={IoCashOutline}
          value={currencyFormatter(200000)}
        />
        <StatCard title="Total Orders" icon={LuShoppingBag} value={'200'} />
        <StatCard title="Total Products" icon={LuPackage} value={'300'} />
        <StatCard title="Total Users" icon={LuUsers} value={'150'} />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <RecentOrders />
        <TopReferralPartners />
      </div>
    </div>
  )
}

export default DashboardSection
