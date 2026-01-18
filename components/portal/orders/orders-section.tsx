'use client'

import {
  BreadcrumbItem,
  Breadcrumbs,
  Card,
  CardBody,
  Chip,
  Input,
  Spinner,
  Tab,
  Tabs,
} from '@heroui/react'
import { useState } from 'react'
import { LuCircleCheckBig, LuCircleX, LuClock, LuPackage } from 'react-icons/lu'
import OrderCard from '@/components/portal/orders/order-card'
import Link from 'next/link'
import { useGetPortalOrders } from '@/hooks/requests/portal/useOrders'
import Cookies from 'js-cookie'
import { OrderCardsSkeleton } from '../PortalSkeletons'

const OrdersSection = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const userId = Cookies.get('portalUserId')
  const { orders, ordersLoading } = useGetPortalOrders()

  const filteredOrders = orders?.filter(
    (order: any) =>
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.products.some((product: any) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  )

  const getOrdersByStatus = (status: string) => {
    return filteredOrders.filter((order: any) => order.orderStatus === status)
  }

  const tabs = [
    {
      key: 'all',
      label: `All Orders (${filteredOrders.length})`,
      orders: filteredOrders,
      emptyIcon: (
        <LuPackage className="mx-auto h-12 w-12 text-foreground-500 mb-4" />
      ),
      emptyText: 'No orders found',
    },
    {
      key: 'processing',
      label: `Processing (${getOrdersByStatus('processing').length})`,
      orders: getOrdersByStatus('processing'),
      emptyIcon: (
        <LuClock className="mx-auto h-12 w-12 text-foreground-500 mb-4" />
      ),
      emptyText: 'No processing orders',
    },
    {
      key: 'in-transit',
      label: `In-Transit (${getOrdersByStatus('in-transit').length})`,
      orders: getOrdersByStatus('in-transit'),
      emptyIcon: (
        <LuPackage className="mx-auto h-12 w-12 text-foreground-500 mb-4" />
      ),
      emptyText: 'No orders in transit',
    },
    {
      key: 'delivered',
      label: `Delivered (${getOrdersByStatus('delivered').length})`,
      orders: getOrdersByStatus('delivered'),
      emptyIcon: (
        <LuCircleCheckBig className="mx-auto h-12 w-12 text-foreground-500 mb-4" />
      ),
      emptyText: 'No delivered orders',
    },
    {
      key: 'cancelled',
      label: `Cancelled (${getOrdersByStatus('cancelled').length})`,
      orders: getOrdersByStatus('cancelled'),
      emptyIcon: (
        <LuCircleX className="mx-auto h-12 w-12 text-foreground-500 mb-4" />
      ),
      emptyText: 'No cancelled orders',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-5 space-y-8">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">My Orders</h1>
            <Breadcrumbs>
              <BreadcrumbItem>
                <Link href="/portal/dashboard">Dashboard</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link href="#">Orders</Link>
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>
        <p className="text-foreground-500">
          Track and manage your order history
        </p>

        <Card className="p-4 md:p-0">
          <CardBody className="px-2 py-6 sm:py-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="relative flex-1">
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 md:pl-2 w-full"
                />
              </div>
              <Chip
                color="danger"
                className="text-sm text-white rounded-md self-end sm:self-center"
              >
                {filteredOrders.length} orders
              </Chip>
            </div>
          </CardBody>
        </Card>

        {ordersLoading ? (
          <OrderCardsSkeleton />
        ) : (
          <Tabs
            aria-label="Orders"
            defaultSelectedKey="all"
            className="mb-2"
            classNames={{
              tabList: 'flex-wrap overflow-x-auto',
              tab: 'w-[120px]',
            }}
          >
            {tabs.map((tab) => (
              <Tab key={tab.key} title={tab.label} className="">
                <div className="space-y-4">
                  {tab.orders.length > 0 ? (
                    tab.orders.map((order: any) => (
                      <OrderCard key={order._id} order={order} />
                    ))
                  ) : (
                    <Card>
                      <CardBody className="p-12 text-center">
                        {tab.emptyIcon}
                        <p className="text-foreground-500">{tab.emptyText}</p>
                      </CardBody>
                    </Card>
                  )}
                </div>
              </Tab>
            ))}
          </Tabs>
        )}
      </div>
    </div>
  )
}

export default OrdersSection
