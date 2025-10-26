'use client'

import { Card, CardBody, Chip, Input, Tab, Tabs } from '@heroui/react'
import { useState } from 'react'
import { LuCircleCheckBig, LuCircleX, LuClock, LuPackage } from 'react-icons/lu'
import OrderCard from './order-card'
import { orders } from '@/library/dummy-data'

const OrdersSection = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const userOrders = orders.filter((order) => order.customerId === '3')
  const filteredOrders = userOrders.filter(
    (order) =>
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) =>
        item.productName.toLowerCase().includes(searchTerm.toLowerCase())
      )
  )

  const getOrdersByStatus = (status) => {
    return filteredOrders.filter((order) => order.status === status)
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
      key: 'pending',
      label: `Pending (${getOrdersByStatus('pending').length})`,
      orders: getOrdersByStatus('pending'),
      emptyIcon: (
        <LuClock className="mx-auto h-12 w-12 text-foreground-500 mb-4" />
      ),
      emptyText: 'No pending orders',
    },
    {
      key: 'confirmed',
      label: `Confirmed (${getOrdersByStatus('confirmed').length})`,
      orders: getOrdersByStatus('confirmed'),
      emptyIcon: (
        <LuPackage className="mx-auto h-12 w-12 text-foreground-500 mb-4" />
      ),
      emptyText: 'No confirmed orders',
    },
    {
      key: 'fulfilled',
      label: `Fulfilled (${getOrdersByStatus('fulfilled').length})`,
      orders: getOrdersByStatus('fulfilled'),
      emptyIcon: (
        <LuCircleCheckBig className="mx-auto h-12 w-12 text-foreground-500 mb-4" />
      ),
      emptyText: 'No fulfilled orders',
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
            <h1 className="text-3xl font-bold text-[#031D91]">My Orders</h1>
            <p className="text-foreground-500">
              Track and manage your order history
            </p>
          </div>
        </div>

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

        {/* <div className="flex flex-col w-full">
          <Tabs
            aria-label="Orders"
            defaultSelectedKey="all"
            className="mb-2"
            classNames={
              {
                // tabList: 'overflow-x-auto gap-2 sm:gap-4 sm:flex-wrap',
              }
            }
          >
            {tabs.map((tab) => (
              <Tab key={tab.key} title={tab.label}>
                <div className="space-y-4">
                  {tab.orders.length > 0 ? (
                    tab.orders.map((order) => (
                      <OrderCard key={order.id} order={order} />
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
        </div> */}
        <Tabs
          aria-label="Orders"
          defaultSelectedKey="all"
          className="mb-2"
          classNames={{
            tabList: 'flex-wrap',
            tab: 'w-24',
          }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.key} title={tab.label} className="">
              <div className="space-y-4">
                {tab.orders.length > 0 ? (
                  tab.orders.map((order) => (
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
      </div>
    </div>
  )
}

export default OrdersSection
