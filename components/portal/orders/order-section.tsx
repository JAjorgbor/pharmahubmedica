'use client'

import { currencyFormatter } from '@/utils/currency-formatter'
import { Button, Card, CardBody, Chip, Spinner } from '@heroui/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
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
import { useGetPortalOrder } from '@/hooks/requests/portal/useOrders'
import moment from 'moment'
import { referralPartnerProfessions } from '@/library/config'

const OrderSection = () => {
  const params = useParams()
  const orderId = params.id as string
  const { order, orderLoading, orderError } = useGetPortalOrder(orderId)

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

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'success'
      case 'pending':
        return 'warning'
      case 'failed':
        return 'danger'
      case 'reversed':
        return 'secondary'
      case 'abandoned':
        return 'default'
      default:
        return 'default'
    }
  }

  if (orderLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner label="Loading order details..." />
      </div>
    )
  }

  if (orderError || !order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <p className="text-xl font-semibold text-danger">Order not found</p>
        <Button as={Link} href="/portal/orders" variant="flat">
          Back to Orders
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-5 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button isIconOnly as={Link} href="/portal/orders" variant="light">
              <LuChevronLeft size={25} />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-primary">
                Order {order.orderNumber}
              </h1>
              <p className="text-gray-600">
                Placed on{' '}
                {moment(order.createdAt).format('MMMM D, YYYY [at] hh:mm A')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Chip
              color={getStatusColor(order.orderStatus)}
              size="sm"
              variant="flat"
            >
              <span className="uppercase font-semibold text-xs">
                {order.orderStatus}
              </span>
            </Chip>
            <Chip
              color={getPaymentStatusColor(order.paymentStatus)}
              size="sm"
              variant="dot"
              className="border-none"
            >
              <span className="uppercase font-semibold text-xs">
                {order.paymentStatus}
              </span>
            </Chip>
          </div>
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
                  {order.products.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-4 border-b border-b-foreground-200 last:border-0"
                    >
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center">
                        {item.productImage ? (
                          <img
                            src={item.productImage?.url}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <LuPackage className="text-gray-400" size={32} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 truncate">
                          {item.productName}
                        </h4>
                        <p className="text-sm text-foreground-600">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {currencyFormatter(item.amount)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {currencyFormatter(item.price)} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-t-foreground-200 space-y-2">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>
                      {currencyFormatter(
                        order.transaction.subTotal ||
                          order.transaction.totalAmount -
                            (order.transaction.deliveryFee || 0),
                      )}
                    </span>
                  </div>
                  {order.transaction.deliveryFee > 0 && (
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Delivery Fee</span>
                      <span>
                        {currencyFormatter(order.transaction.deliveryFee)}
                      </span>
                    </div>
                  )}
                  {order.transaction.discount > 0 && (
                    <div className="flex items-center justify-between text-sm text-success">
                      <span>Discount</span>
                      <span>
                        -{currencyFormatter(order.transaction.discount)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xl font-bold pt-2">
                    <span>Total Amount</span>
                    <span className="text-primary">
                      {currencyFormatter(order.transaction.totalAmount)}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>

            {order.referralDetails?.referralPartner && (
              <Card className="border-green-200 bg-green-50 shadow-sm">
                <CardBody className="p-6">
                  <div className="flex flex-col mb-4">
                    <h1 className="flex items-center space-x-2 text-green-900 font-bold">
                      <LuUserCheck className="h-5 w-5" />
                      <span>Referral Applied</span>
                    </h1>
                    <p className="text-green-700 text-sm">
                      This order was placed using a referral code
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-green-700 uppercase font-semibold">
                        Referrer
                      </p>
                      <p className="font-medium text-green-900">
                        {
                          referralPartnerProfessions[
                            order.referralDetails.referralPartner.profession
                          ]
                        }{' '}
                        {order.referralDetails.referralPartner.user.firstName}{' '}
                        {order.referralDetails.referralPartner.user.firstName}
                      </p>
                    </div>
                    {order.transaction.discountCode && (
                      <div>
                        <p className="text-xs text-green-700 uppercase font-semibold">
                          Discount Code
                        </p>
                        <p className="font-mono text-sm font-medium text-green-900 uppercase">
                          {order.transaction.discountCode}
                        </p>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            )}

            <Card>
              <CardBody className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">
                    Delivery Information
                  </h3>
                  <p className="text-sm text-foreground-500">
                    Shipping details
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-foreground-500 uppercase font-bold mb-1">
                      Address
                    </p>
                    <p className="text-sm font-medium">
                      {order.deliveryAddress.street}
                    </p>
                    <p className="text-sm font-medium">
                      {order.deliveryAddress.city},{' '}
                      {order.deliveryAddress.state}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground-500 uppercase font-bold mb-1">
                      Method
                    </p>
                    <p className="text-sm font-medium">
                      {order.deliveryMethod.name}
                    </p>
                    <p className="text-sm text-foreground-400">
                      {order.deliveryMethod.description}
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
                  <h1 className="mb-2 font-bold uppercase text-xs text-foreground-500">
                    Current Order Status
                  </h1>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-900 font-semibold capitalize">
                      {order.orderStatus}
                    </p>
                    <div className="flex flex-col items-end gap-1">
                      <Chip
                        color={getStatusColor(order.orderStatus)}
                        variant="flat"
                        size="sm"
                      >
                        <div className="flex items-center gap-1">
                          {order.orderStatus === 'processing' && (
                            <LuClock size={14} />
                          )}
                          {order.orderStatus === 'in-transit' && (
                            <LuPackage size={14} />
                          )}
                          {order.orderStatus === 'delivered' && (
                            <LuCircleCheckBig size={14} />
                          )}
                          {order.orderStatus === 'cancelled' && (
                            <LuCircleX size={14} />
                          )}
                          <span className="capitalize text-xs font-semibold">
                            {order.orderStatus}
                          </span>
                        </div>
                      </Chip>
                      <Chip
                        color={getPaymentStatusColor(order.paymentStatus)}
                        variant="dot"
                        size="sm"
                        className="border-none"
                      >
                        <span className="capitalize text-xs font-semibold">
                          Payment: {order.paymentStatus}
                        </span>
                      </Chip>
                    </div>
                  </div>
                </div>
                {order.trackingId && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-700 font-bold uppercase mb-1">
                      Tracking ID
                    </p>
                    <p className="font-mono font-bold text-blue-900">
                      {order.trackingId}
                    </p>
                  </div>
                )}
                <Button
                  color="success"
                  startContent={<FaWhatsapp size={20} />}
                  fullWidth
                  className="text-white font-bold"
                  as="a"
                  href={`https://wa.me/2349132172737?text=Hello, I have a question about my order ${order.orderNumber}`}
                  target="_blank"
                >
                  Contact Support
                </Button>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="space-y-6 p-6">
                <h1 className="mb-2 font-bold uppercase text-xs text-foreground-500">
                  Order Timeline
                </h1>
                <div className="flex items-start space-x-3">
                  <LuCalendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">
                      Placed
                    </p>
                    <p className="font-medium text-gray-900">
                      {moment(order.createdAt).format(
                        'MMM D, YYYY [at] hh:mm A',
                      )}
                    </p>
                  </div>
                </div>
                {order.orderAudit.processedAt !== 'not-available' && (
                  <div className="flex items-start space-x-3">
                    <LuClock className="h-5 w-5 text-warning-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase">
                        Processed
                      </p>
                      <p className="font-medium text-gray-900">
                        {moment(order.orderAudit.processedAt).format(
                          'MMM D, YYYY [at] hh:mm A',
                        )}
                      </p>
                    </div>
                  </div>
                )}
                {order.orderAudit.inTransitAt !== 'not-available' && (
                  <div className="flex items-start space-x-3">
                    <LuPackage className="h-5 w-5 text-primary-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase">
                        In Transit
                      </p>
                      <p className="font-medium text-gray-900">
                        {moment(order.orderAudit.inTransitAt).format(
                          'MMM D, YYYY [at] hh:mm A',
                        )}
                      </p>
                    </div>
                  </div>
                )}
                {order.orderAudit.deliveredAt !== 'not-available' && (
                  <div className="flex items-start space-x-3">
                    <LuCircleCheckBig className="h-5 w-5 text-success-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase">
                        Delivered
                      </p>
                      <p className="font-medium text-gray-900">
                        {moment(order.orderAudit.deliveredAt).format(
                          'MMM D, YYYY [at] hh:mm A',
                        )}
                      </p>
                    </div>
                  </div>
                )}
                {order.orderAudit.cancelledAt !== 'not-available' && (
                  <div className="flex items-start space-x-3">
                    <LuCircleX className="h-5 w-5 text-danger-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase">
                        Cancelled
                      </p>
                      <p className="font-medium text-gray-900">
                        {moment(order.orderAudit.cancelledAt).format(
                          'MMM D, YYYY [at] hh:mm A',
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>

            {order.note && (
              <Card>
                <CardBody className="p-6">
                  <h1 className="mb-2 font-bold uppercase text-xs text-foreground-500">
                    Order Note
                  </h1>
                  <p className="text-sm text-gray-600">{order.note}</p>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSection
