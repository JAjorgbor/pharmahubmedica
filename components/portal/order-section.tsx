'use client'

import { orders } from '@/library/dummy-data'
import { currencyFormatter } from '@/utils/currencyFormatter'
import { Button, Card, CardBody, Chip } from '@heroui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import {
  LuCalendar,
  LuChevronLeft,
  LuCircleCheckBig,
  LuCircleX,
  LuClock,
  LuPackage,
  LuUserCheck,
} from 'react-icons/lu'

const OrderSection = () => {
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
        <div className="flex items-center justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 space-x-4">
            <Button
              as={Link}
              href="/portal/orders"
              variant="flat"
              size="sm"
              className="font-bold"
              startContent={<LuChevronLeft className="h-4 w-4 mr-2" />}
            >
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Order ORD-023
              </h1>
              <p className="text-gray-600">Placed on July 23, 2025 at 12:14</p>
            </div>
          </div>
          <Chip color="danger" size="sm" variant="flat">
            <span className="uppercase">Cancelled</span>
          </Chip>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4">
                  <h3 className="font-semibold text-lg">Order Items</h3>
                  <p className="text-sm text-foreground-500">
                    Products in your order
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 pb-4 border-b border-b-foreground-200 last:border-0">
                    <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src="/multivitamin-tablets-bottle.jpg"
                        alt={'Product Image'}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 truncate">
                        Multivitamin Complex
                      </h4>
                      <p className="text-sm text-foreground-600">Quantity: 2</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {currencyFormatter(2400)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {currencyFormatter(1200)} each
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 pb-4 border-b border-b-foreground-200 last:border-0">
                    <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src="/digital-blood-pressure-monitor.png"
                        alt={'Product Image'}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 truncate">
                        Blood Pressure Monitor
                      </h4>
                      <p className="text-sm text-foreground-600">Quantity: 1</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {currencyFormatter(10000)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {currencyFormatter(10000)} each
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-t-foreground-200">
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Total Amount</span>
                    <span className="text-[#031D91]">
                      {currencyFormatter(2400)}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardBody className="p-6">
                <div className="flex flex-col">
                  <h1 className="flex items-center space-x-2 text-green-900">
                    <LuUserCheck className="h-5 w-5" />
                    <span>Referral Discount Applied</span>
                  </h1>
                  <p className="text-green-700">
                    This order was placed through a doctor referral
                  </p>
                </div>
                <div className="mt-3">
                  <div>
                    <p className="text-sm text-green-700">Referred by</p>
                    <p className="font-medium text-green-900">Dr John Sue</p>
                  </div>
                  <div>
                    <p className="text-sm text-green-700">Referral Code</p>
                    <p className="font-mono text-sm font-medium text-green-900">
                      REF256
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardBody className="p-6">
                <div className="mb-4">
                  <h1 className="mb-2 font-bold">Order Status</h1>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">Current Status</p>
                    <Chip color="danger" variant="flat" size="sm">
                      Cancelled
                    </Chip>
                  </div>
                </div>
                <Button
                  color="success"
                  startContent={<FaWhatsapp size={20} />}
                  fullWidth
                  className="text-white"
                >
                  Contact via WhatsApp
                </Button>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="space-y-4 p-6">
                <h1 className="mb-2 font-bold">Order Timeline</h1>
                <div className="flex items-start space-x-3">
                  <LuCalendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Order Placed</p>
                    <p className="font-medium text-gray-900">
                      July 23, 2025 at 12:14
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <LuCalendar className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Fulfilled</p>
                    <p className="font-medium text-gray-900">
                      July 30, 2025 at 12:14
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <h1 className="mb-2 font-bold">Need Help?</h1>
                <p className="text-sm text-gray-600 mb-4">
                  If you have any questions about your order, feel free to
                  contact us via WhatsApp.
                </p>
                <Button
                  color="success"
                  startContent={<FaWhatsapp size={20} />}
                  fullWidth
                  className="text-white"
                >
                  Contact via WhatsApp
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSection
