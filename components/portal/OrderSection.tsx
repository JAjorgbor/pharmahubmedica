'use client'

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

const orders = [
  {
    id: 'ORD-001',
    customerId: '3',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+1234567890',
    items: [
      {
        productId: 1,
        productName: 'Vitamin D3 1000 IU',
        productImage: '/vitamin-d3-supplement-bottle.jpg',
        quantity: 2,
        price: 12.99,
        totalPrice: 25.98,
      },
      {
        productId: 2,
        productName: 'Pain Relief Tablets',
        productImage: '/pain-relief-medicine-tablets.jpg',
        quantity: 1,
        price: 8.49,
        totalPrice: 8.49,
      },
    ],
    totalAmount: 34.47,
    status: 'pending',
    orderDate: '2024-01-15T10:30:00Z',
    notes: 'Customer requested fast delivery',
  },
  {
    id: 'ORD-002',
    customerId: '3',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '+1234567891',
    items: [
      {
        productId: 3,
        productName: 'Digital Thermometer',
        productImage: '/digital-medical-thermometer.jpg',
        quantity: 1,
        price: 24.99,
        totalPrice: 24.99,
      },
    ],
    totalAmount: 24.99,
    status: 'fulfilled',
    orderDate: '2024-01-14T15:45:00Z',
    fulfillmentDate: '2024-01-15T09:00:00Z',
  },
  {
    id: 'ORD-003',
    customerId: '2',
    customerName: 'Dr. Sarah Johnson',
    customerEmail: 'doctor@example.com',
    customerPhone: '+1234567892',
    items: [
      {
        productId: 4,
        productName: 'Omega-3 Fish Oil',
        productImage: '/omega-3-capsules.png',
        quantity: 3,
        price: 19.99,
        totalPrice: 59.97,
      },
    ],
    totalAmount: 59.97,
    status: 'confirmed',
    orderDate: '2024-01-13T12:20:00Z',
    referralId: 'REF-001',
  },
  {
    id: 'ORD-004',
    customerId: '3',
    customerName: 'Mary Wilson',
    customerEmail: 'mary@example.com',
    customerPhone: '+1234567893',
    items: [
      {
        productId: 5,
        productName: 'Blood Pressure Monitor',
        productImage: '/digital-blood-pressure-monitor.png',
        quantity: 1,
        price: 49.99,
        totalPrice: 49.99,
      },
      {
        productId: 6,
        productName: 'Multivitamin Complex',
        productImage: '/multivitamin-tablets-bottle.jpg',
        quantity: 2,
        price: 16.99,
        totalPrice: 33.98,
      },
    ],
    totalAmount: 83.97,
    status: 'cancelled',
    orderDate: '2024-01-12T08:15:00Z',
    notes: 'Customer cancelled due to change of mind',
  },
  {
    id: 'ORD-005',
    customerId: '3',
    customerName: 'Robert Brown',
    customerEmail: 'robert@example.com',
    customerPhone: '+1234567894',
    items: [
      {
        productId: 1,
        productName: 'Vitamin D3 1000 IU',
        productImage: '/vitamin-d3-supplement-bottle.jpg',
        quantity: 1,
        price: 12.99,
        totalPrice: 12.99,
      },
    ],
    totalAmount: 12.99,
    status: 'fulfilled',
    orderDate: '2024-01-11T16:30:00Z',
    fulfillmentDate: '2024-01-12T11:00:00Z',
  },
]

const OrderSection = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const userOrders = orders.filter((order) => order.customerId === '3')
  const filteredOrders = userOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          <div className="flex items-center space-x-4">
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
                  <div className="flex items-center space-x-4 pb-4 border-b border-b-foreground-200 last:border-0">
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
                  <div className="flex items-center space-x-4 pb-4 border-b border-b-foreground-200 last:border-0">
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
