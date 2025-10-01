'use client'

import { Button, Card, CardBody, Chip, Input, Tab, Tabs } from '@heroui/react'
import Link from 'next/link'
import { useState } from 'react'
import {
  LuArrowLeft,
  LuCircleCheckBig,
  LuCircleX,
  LuClock,
  LuPackage,
  LuSearch,
} from 'react-icons/lu'
import OrderCard from './OrderCard'

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

const OrdersSection = () => {
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
      <div className="max-w-6xl mx-auto p-5 md:px-0 space-y-8">
        <div className="flex items-center space-x-4">
          <Link href="/portal/dashboard">
            <Button size="sm" variant="light">
              <LuArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#031D91]">My Orders</h1>
            <p className="text-foreground-500">
              Track and manage your order history
            </p>
          </div>
        </div>

        <Card>
          <CardBody className="px-0 py-10">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-sm">
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  startContent={
                    <LuSearch className="text-muted-foreground h-4 w-4" />
                  }
                />
              </div>
              <Chip color="danger" className="text-sm text-white rounded-md">
                {filteredOrders.length} orders
              </Chip>
            </div>
          </CardBody>
        </Card>

        <Tabs aria-label="Orders" defaultSelectedKey="all">
          {tabs.map((tab) => (
            <Tab key={tab.key} title={tab.label}>
              <div className="space-y-4 mt-4">
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
      </div>
    </div>
  )
}

export default OrdersSection
