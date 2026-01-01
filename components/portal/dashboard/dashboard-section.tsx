'use client'

import { currencyFormatter } from '@/utils/currency-formatter'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from '@heroui/react'
import Image from 'next/image'
import Link from 'next/link'
import { FaShoppingBag, FaWhatsapp } from 'react-icons/fa'
import {
  LuCircleCheckBig,
  LuCircleX,
  LuClock,
  LuEye,
  LuPackage,
  LuShoppingBag,
} from 'react-icons/lu'

const recentOrders = [
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
        price: 12999,
        totalPrice: 25998,
      },
      {
        productId: 2,
        productName: 'Pain Relief Tablets',
        productImage: '/pain-relief-medicine-tablets.jpg',
        quantity: 1,
        price: 8499,
        totalPrice: 8499,
      },
    ],
    totalAmount: 34497,
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
        price: 24999,
        totalPrice: 24999,
      },
    ],
    totalAmount: 24999,
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
        price: 19999,
        totalPrice: 59997,
      },
    ],
    totalAmount: 59997,
    status: 'confirmed',
    orderDate: '2024-01-13T12:20:00Z',
    referralId: 'REF-001',
  },
]

const DashboardSection = () => {
  const getStatusIcon = (status: any) => {
    switch (status) {
      case 'pending':
        return <LuClock className="h-4 w-4" />
      case 'confirmed':
        return <LuPackage className="h-4 w-4" />
      case 'fulfilled':
        return <LuCircleCheckBig className="h-4 w-4" />
      case 'cancelled':
        return <LuCircleX className="h-4 w-4" />
      default:
        return <LuClock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: any) => {
    switch (status) {
      case 'pending':
        return 'warning'
      case 'confirmed':
        return 'primary'
      case 'fulfilled':
        return 'success'
      case 'cancelled':
        return 'danger'
      default:
        return 'default'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-5 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">
            Welcome back, Jane Doe!
          </h1>
          <p className="text-muted-foreground">
            Manage your orders and account settings
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
          <Card className="p-5">
            <CardBody>
              <div className="flex items-center space-x-2">
                <LuShoppingBag className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Orders
                  </p>
                  <p className="text-2xl font-bold">14</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="p-5">
            <CardBody>
              <div className="flex items-center space-x-2">
                <LuClock className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Pending Orders
                  </p>
                  <p className="text-2xl font-bold">4</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="p-5">
            <CardBody>
              <div className="flex items-center space-x-2">
                <LuCircleCheckBig className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Completed Orders
                  </p>
                  <p className="text-2xl font-bold">5</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="p-5">
            <CardBody>
              <div className="flex items-center space-x-2">
                <LuPackage className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Spent
                  </p>
                  <p className="text-2xl font-bold">
                    {currencyFormatter(20000)}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <Card className="md:p-5">
          <CardHeader className="flex flex-row items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <Link href="/portal/orders">
              <Button size="sm" variant="ghost">
                View All Orders
              </Button>
            </Link>
          </CardHeader>
          <CardBody>
            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <Card
                    key={order.id}
                    shadow="none"
                    className="border border-foreground-200"
                  >
                    <CardBody>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <Image
                              width={48}
                              height={48}
                              src={
                                order.items[0]?.productImage ||
                                '/placeholder.svg'
                              }
                              alt={order.items[0]?.productName}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {order.items.length} item
                              {order.items.length > 1 ? 's' : ''}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.orderDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <p className="font-medium">
                            {currencyFormatter(order.totalAmount)}
                          </p>
                          <Chip
                            color={getStatusColor(order.status)}
                            size="sm"
                            variant="flat"
                            startContent={getStatusIcon(order.status)}
                            className="capitalize"
                          >
                            {order.status}
                          </Chip>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FaShoppingBag className="mx-auto text-muted-foreground" />{' '}
                size={40}
                <p className="mt-2 text-muted-foreground">No orders yet</p>
                <Link href="/collections">
                  <Button className="mt-4 bg-primary hover:bg-blue-800">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            )}
          </CardBody>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-2">
            <CardHeader>
              <LuShoppingBag className="mx-auto text-primary" size={40} />
            </CardHeader>
            <CardBody className="text-center">
              <h3 className="font-semibold mb-2">Browse Products</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Explore our wide range of medicines and health products
              </p>
            </CardBody>
            <CardFooter>
              <Button
                as={Link}
                className="w-full bg-primary hover:bg-blue-800 text-white"
                href="/collections"
              >
                Shop Now
              </Button>
            </CardFooter>
          </Card>

          <Card className="p-2">
            <CardHeader>
              <FaWhatsapp className="mx-auto text-primary" size={40} />
            </CardHeader>
            <CardBody className="text-center">
              <h3 className="font-semibold mb-2">WhatsApp Orders</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Place orders directly through WhatsApp for quick service
              </p>
            </CardBody>
            <CardFooter>
              <Button variant="ghost" className="border w-full shadow-xs">
                Contact Us
              </Button>
            </CardFooter>
          </Card>

          <Card className="p-2">
            <CardHeader>
              <LuEye className="mx-auto text-primary" size={40} />
            </CardHeader>
            <CardBody className="text-center">
              <h3 className="font-semibold mb-2">Order History</h3>
              <p className="text-sm text-muted-foreground mb-4">
                View and track all your previous orders and purchases
              </p>
            </CardBody>
            <CardFooter>
              <Button
                variant="ghost"
                as={Link}
                href="/portal/orders"
                className="border shadow-xs"
                fullWidth
              >
                View Orders
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DashboardSection
