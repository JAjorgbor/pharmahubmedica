'use client'
import StatCard from '@/components/admin/dashboard/stat-card'
import { IoCashOutline } from 'react-icons/io5'
import React from 'react'
import { currencyFormatter } from '@/utils/currency-formatter'
import { LuEye, LuPackage, LuShoppingBag, LuUsers } from 'react-icons/lu'
import { Button } from '@heroui/react'
import RecentOrders from '@/components/admin/dashboard/recent-orders'
import TopReferralPartners from '@/components/admin/dashboard/top-referral-partners'
import Link from 'next/link'
import { useGetAdminOrderStats } from '@/hooks/requests/admin/useAdminOrders'
import { useGetProductsStats } from '@/hooks/requests/admin/useGetProductsStats'
import { useGetCustomersStats } from '@/hooks/requests/admin/useGetCustomersStats'
import { AdminStatsSkeleton } from '@/components/admin/AdminSkeletons'

const DashboardSection = () => {
  const { orderStats, orderStatsLoading } = useGetAdminOrderStats()
  const { productsStats, productsStatsLoading } = useGetProductsStats()
  const { customersStats, customersStatsLoading } = useGetCustomersStats()

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
          as={Link}
          href={'/'}
        >
          View Store
        </Button>
      </div>

      {orderStatsLoading || productsStatsLoading || customersStatsLoading ? (
        <AdminStatsSkeleton />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
          <StatCard
            title="Total Revenue"
            icon={IoCashOutline}
            value={currencyFormatter(orderStats?.totalRevenue)}
          />
          <StatCard
            title="Total Orders"
            icon={LuShoppingBag}
            value={orderStats?.totalOrders}
          />
          <StatCard
            title="Total Products"
            icon={LuPackage}
            value={productsStats?.total}
          />
          <StatCard
            title="Total Users"
            icon={LuUsers}
            value={customersStats?.totalUsers}
          />
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        <RecentOrders />
        <TopReferralPartners />
      </div>
    </div>
  )
}

export default DashboardSection
