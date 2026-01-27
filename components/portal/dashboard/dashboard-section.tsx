'use client'

import {
  OrderCardsSkeleton,
  StatsSkeleton,
} from '@/components/portal/PortalSkeletons'
import {
  useGetPortalOrderStats,
  useGetPortalRecentOrders,
} from '@/hooks/requests/portal/useOrders'
import useGetApp from '@/hooks/requests/useGetApp'
import useGetPortalUser from '@/hooks/requests/useGetPortalUser'
import { currencyFormatter } from '@/utils/currency-formatter'
import { toWhatsAppNumber } from '@/utils/to-whatsapp-number'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Skeleton,
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

const DashboardSection = () => {
  const { app } = useGetApp()
  const whatsappNumber = app?.whatsAppNumber
    ? toWhatsAppNumber(app.whatsAppNumber, 'NG')
    : ''

  const getStatusIcon = (status: any) => {
    switch (status) {
      case 'processing':
        return <LuClock className="h-4 w-4" />
      case 'in-transit':
        return <LuPackage className="h-4 w-4" />
      case 'delivered':
        return <LuCircleCheckBig className="h-4 w-4" />
      case 'cancelled':
        return <LuCircleX className="h-4 w-4" />
      default:
        return <LuClock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: any) => {
    switch (status) {
      case 'processing':
        return 'warning'
      case 'delivered':
        return 'success'
      case 'in-transit':
        return 'primary'
      case 'cancelled':
        return 'danger'
      default:
        return 'default'
    }
  }

  const { orderStats, orderStatsLoading } = useGetPortalOrderStats()
  const { recentOrders, recentOrdersLoading } = useGetPortalRecentOrders()
  const { portalUser } = useGetPortalUser()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-5 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">
            {portalUser ? (
              <>
                Welcome back, {portalUser?.firstName} {portalUser?.lastName}!
              </>
            ) : (
              <Skeleton className="h-10 w-1/3 rounded-lg mx-auto" />
            )}
          </h1>
          <p className="text-foreground-500">
            Manage your orders and account settings
          </p>
        </div>

        {orderStatsLoading ? (
          <StatsSkeleton />
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
            <Card className="p-5">
              <CardBody>
                <div className="flex items-center space-x-2">
                  <LuShoppingBag className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground-500">
                      Total Orders
                    </p>
                    <p className="text-2xl font-bold">
                      {orderStats?.totalOrders}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="p-5">
              <CardBody>
                <div className="flex items-center space-x-2">
                  <LuClock className="h-8 w-8 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-foreground-500">
                      Pending Orders
                    </p>
                    <p className="text-2xl font-bold">
                      {orderStats?.processing}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="p-5">
              <CardBody>
                <div className="flex items-center space-x-2">
                  <LuCircleCheckBig className="h-8 w-8 text-success" />
                  <div>
                    <p className="text-sm font-medium text-foreground-500">
                      Completed Orders
                    </p>
                    <p className="text-2xl font-bold">
                      {orderStats?.delivered}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="p-5">
              <CardBody>
                <div className="flex items-center space-x-2">
                  <LuPackage className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground-500">
                      Total Spent
                    </p>
                    <p className="text-2xl font-bold">
                      {currencyFormatter(orderStats?.totalSpent)}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        <Card className="md:p-5">
          <CardHeader className="flex flex-row items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <Button size="sm" variant="ghost" as={Link} href="/portal/orders">
              View All Orders
            </Button>
          </CardHeader>
          <CardBody>
            {recentOrdersLoading ? (
              <OrderCardsSkeleton />
            ) : recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <Card
                    key={order._id}
                    shadow="none"
                    className="border border-foreground-200"
                  >
                    <CardBody>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            {order.products[0]?.productImage?.url ? (
                              <Image
                                width={48}
                                height={48}
                                src={
                                  order.products[0]?.productImage?.url ||
                                  '/placeholder.svg'
                                }
                                alt={order.products[0]?.productName}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                            ) : (
                              <LuPackage
                                size={50}
                                className="text-default-400"
                                strokeWidth={0.8}
                              />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-primary">
                              {order.orderNumber}
                            </p>
                            <p className="text-sm text-foreground-500">
                              {order.products.length} item
                              {order.products.length > 1 ? 's' : ''}
                            </p>
                            <p className="text-sm text-foreground-500">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <p className="font-medium">
                            {currencyFormatter(order.transaction?.totalAmount)}
                          </p>
                          <Chip
                            color={getStatusColor(order.orderStatus)}
                            size="sm"
                            variant="flat"
                            startContent={getStatusIcon(order.orderStatus)}
                            className="capitalize"
                          >
                            {order.orderStatus}
                          </Chip>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FaShoppingBag
                  className="mx-auto text-foreground-500"
                  size={40}
                />
                <p className="mt-2 text-foreground-500">No orders yet</p>
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
              <p className="text-sm text-foreground-500 mb-4">
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
              <p className="text-sm text-foreground-500 mb-4">
                Place orders directly through WhatsApp for quick service
              </p>
            </CardBody>
            <CardFooter>
              <Button
                variant="ghost"
                className="border w-full shadow-xs"
                as={'a'}
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
              >
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
              <p className="text-sm text-foreground-500 mb-4">
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
