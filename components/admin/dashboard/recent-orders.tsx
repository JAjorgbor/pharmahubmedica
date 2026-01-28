'use client'
import { RecentOrdersSkeleton } from '@/components/admin/AdminSkeletons'
import { useGetAdminOrders } from '@/hooks/requests/admin/useAdminOrders'
import { currencyFormatter } from '@/utils/currency-formatter'
import { Button, Card, CardBody, CardHeader, Chip } from '@heroui/react'
import { sentenceCase } from 'change-case'
import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import { LuPackage, LuShoppingBag } from 'react-icons/lu'

const RecentOrders = () => {
  const { orders, ordersLoading } = useGetAdminOrders({ limit: 10 })
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'warning'
      case 'in-transit':
        return 'primary'
      case 'delivered':
        return 'success'
      case 'cancelled':
        return 'danger'
      default:
        return 'default'
    }
  }

  return (
    <Card shadow="sm" className="p-3">
      <CardHeader className="justify-between items-center">
        <p className="font-semibold text-foreground text-lg">Recent Orders</p>
        <Button size="sm" variant="bordered" as={Link} href="/admin/orders">
          View All
        </Button>
      </CardHeader>
      <CardBody>
        <div className="space-y-4 h-96  overflow-y-auto">
          {ordersLoading ? (
            <RecentOrdersSkeleton />
          ) : orders?.length > 0 ? (
            orders?.map((each, index) => (
              <Card
                shadow="none"
                className="border border-foreground-200"
                key={index}
              >
                <CardHeader className="justify-between">
                  <p className="text-sm text-primary">{each?.orderNumber}</p>
                  <p className="text-foreground-600">
                    {currencyFormatter(each?.transaction?.totalAmount)}
                  </p>
                </CardHeader>
                <CardBody>
                  <div className="flex gap-4 items-center">
                    {each?.products?.[0]?.productImage ? (
                      <img
                        src={each?.products?.[0]?.productImage?.url}
                        alt={each?.products?.[0]?.productName}
                        className="size-12 object-cover"
                      />
                    ) : (
                      <LuPackage className="text-gray-400" size={30} />
                    )}
                    <div className="space-y-1 flex-1">
                      <div className="flex justify-between text-foreground-600">
                        <span>
                          {each?.customer?.firstName} {each?.customer?.lastName}
                        </span>
                        <Chip
                          size="sm"
                          color={getStatusColor(each?.orderStatus)}
                          variant="flat"
                        >
                          {sentenceCase(each?.orderStatus)}
                        </Chip>
                      </div>
                      <p className="text-sm">{each?.products?.length} Items</p>
                      <div className="flex justify-between items-end pt-2">
                        <p className="text-foreground-500 text-sm">
                          {moment(each?.createdAt).format('DD MMMM, YYYY')}
                        </p>
                        <Button
                          size="sm"
                          color="primary"
                          variant="light"
                          as={Link}
                          href={`/admin/orders/${each?._id}`}
                          className="h-6"
                        >
                          View Order
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-foreground-500">
              <LuShoppingBag size={40} className="mb-2" />
              <p>No recent orders</p>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  )
}

export default RecentOrders
