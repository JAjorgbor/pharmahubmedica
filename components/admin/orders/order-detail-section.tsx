'use client'

import { currencyFormatter } from '@/utils/currency-formatter'
import { Button, Card, CardBody, Chip, Spinner, addToast } from '@heroui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputField from '@/components/elements/input-field'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import {
  LuCalendar,
  LuChevronLeft,
  LuCircleCheckBig,
  LuCircleX,
  LuClock,
  LuPackage,
  LuUserCheck,
  LuPrinter,
  LuSave,
} from 'react-icons/lu'
import { useGetAdminOrder } from '@/hooks/requests/admin/useAdminOrders'
import { adminOrderRequests } from '@/api-client/admin/requests/order.requests'
import moment from 'moment'
import { toWhatsAppNumber } from '@/utils/to-whatsapp-number'

const orderUpdateSchema = z.object({
  orderStatus: z.enum(['processing', 'in-transit', 'delivered', 'cancelled']),
  paymentStatus: z.enum(['pending', 'paid', 'failed', 'abandoned', 'reversed']),
  trackingId: z.string().optional(),
  note: z.string().optional(),
})

type OrderUpdateFormData = z.infer<typeof orderUpdateSchema>

const orderStatusOptions = [
  { label: 'Processing', value: 'processing' },
  { label: 'In Transit', value: 'in-transit' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Cancelled', value: 'cancelled' },
]

const paymentStatusOptions = [
  { label: 'Pending', value: 'pending' },
  { label: 'Paid', value: 'paid' },
  { label: 'Failed', value: 'failed' },
  { label: 'Abandoned', value: 'abandoned' },
  { label: 'Reversed', value: 'reversed' },
]

const OrderDetailSection = () => {
  const params = useParams()
  const orderId = params.id as string
  const { order, orderLoading, orderError, mutateOrder } =
    useGetAdminOrder(orderId)

  const [isUpdating, setIsUpdating] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<OrderUpdateFormData>({
    resolver: zodResolver(orderUpdateSchema),
  })

  useEffect(() => {
    if (order) {
      reset({
        orderStatus: order.orderStatus as any,
        paymentStatus: order.paymentStatus as any,
        trackingId: order.trackingId || '',
        note: order.note || '',
      })
    }
  }, [order, reset])

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

  const handleUpdateOrder = async (data: OrderUpdateFormData) => {
    setIsUpdating(true)
    try {
      await adminOrderRequests.updateOrderStatus(orderId, data)
      addToast({
        title: 'Success',
        description: 'Order updated successfully',
        color: 'success',
      })
      mutateOrder()
    } catch (error) {
      addToast({
        title: 'Error',
        description:
          error?.data?.message || error?.message || 'Failed to update order',
        color: 'danger',
      })
    } finally {
      setIsUpdating(false)
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
        <Button as={Link} href="/admin/orders" variant="flat">
          Back to Orders
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <div className="max-w-7xl mx-auto p-5 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button isIconOnly as={Link} href="/admin/orders" variant="light">
              <LuChevronLeft size={25} />
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-primary">
                  Order {order.orderNumber}
                </h1>
                <Chip
                  color={getStatusColor(order.orderStatus)}
                  size="sm"
                  variant="flat"
                  className="font-semibold uppercase"
                >
                  {order.orderStatus}
                </Chip>
              </div>
              <p className="text-gray-600">
                Placed on{' '}
                {moment(order.createdAt).format('MMMM D, YYYY [at] hh:mm A')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" startContent={<LuPrinter />}>
              Print Invoice
            </Button>
            <Button
              color="primary"
              startContent={<LuSave />}
              onPress={() => handleSubmit(handleUpdateOrder)()}
              isLoading={isUpdating}
              isDisabled={!isDirty}
            >
              Save Changes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card>
              <CardBody className="p-6">
                <div className="mb-4">
                  <h3 className="font-semibold text-lg">Order Items</h3>
                  <p className="text-sm text-foreground-500">
                    Products in this order
                  </p>
                </div>

                <div className="space-y-4">
                  {order.products.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-4 border-b border-b-foreground-200 last:border-0"
                    >
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center border">
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
                            (order.transaction.deliveryFee || 0)
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

            {/* Customer & Delivery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card shadow="sm">
                <CardBody className="p-6">
                  <h3 className="font-semibold text-lg mb-4">
                    Customer Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-foreground-500 uppercase font-bold">
                        Name
                      </p>
                      <p className="font-medium">
                        {order.customer.firstName} {order.customer.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground-500 uppercase font-bold">
                        Email
                      </p>
                      <p className="font-medium">{order.customer.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground-500 uppercase font-bold">
                        Phone
                      </p>
                      <p className="font-medium">
                        {order.customer.phoneNumber}
                      </p>
                    </div>
                    <Button
                      as="a"
                      href={`https://wa.me/${toWhatsAppNumber(
                        order.customer.phoneNumber?.replace(/\D/g, ''),
                        'NG'
                      )}`}
                      target="_blank"
                      color="success"
                      variant="flat"
                      size="sm"
                      startContent={<FaWhatsapp />}
                      className="mt-2"
                    >
                      Contact Customer
                    </Button>
                  </div>
                </CardBody>
              </Card>

              <Card shadow="sm">
                <CardBody className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Delivery Info</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-foreground-500 uppercase font-bold">
                        Method
                      </p>
                      <p className="font-medium">
                        {order.deliveryMethod?.name}
                      </p>
                      <p className="text-xs text-foreground-400">
                        {order.deliveryMethod?.description}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground-500 uppercase font-bold">
                        Address
                      </p>
                      <p className="text-sm">
                        {order.deliveryAddress?.street}
                        <br />
                        {order.deliveryAddress?.city},{' '}
                        {order.deliveryAddress?.state}
                        <br />
                        {order.deliveryAddress?.postalCode}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Referral Info */}
            {order.referralDetails?.referralPartner && (
              <Card className="border-green-200 bg-green-50 shadow-sm">
                <CardBody className="p-6">
                  <div className="flex flex-col mb-4">
                    <h1 className="flex items-center space-x-2 text-green-900 font-bold">
                      <LuUserCheck className="h-5 w-5" />
                      <span>Referral Applied</span>
                    </h1>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-green-700 uppercase font-semibold">
                        Partner ID
                      </p>
                      <p className="font-medium text-green-900">
                        {order.referralDetails.referralPartner}
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
          </div>

          <div className="space-y-6">
            {/* Status Management */}
            <Card shadow="sm" className="border-primary/20">
              <CardBody className="p-6 space-y-4">
                <h3 className="font-bold text-lg">Manage Order</h3>

                <InputField
                  type="select"
                  label="Order Status"
                  placeholder="Select status"
                  options={orderStatusOptions}
                  controllerProps={{ control, name: 'orderStatus' }}
                />

                <InputField
                  type="select"
                  label="Payment Status"
                  placeholder="Select status"
                  options={paymentStatusOptions}
                  controllerProps={{ control, name: 'paymentStatus' }}
                />

                <InputField
                  type="text"
                  label="Tracking ID"
                  placeholder="Enter tracking number"
                  controllerProps={{ control, name: 'trackingId' }}
                />

                <InputField
                  type="textarea"
                  label="Order Note"
                  placeholder="Add a comment for the user"
                  rows={3}
                  controllerProps={{ control, name: 'note' }}
                />
              </CardBody>
            </Card>

            {/* Timeline */}
            <Card shadow="sm">
              <CardBody className="p-6 space-y-6">
                <h3 className="font-bold uppercase text-xs text-foreground-500">
                  Order Timeline
                </h3>
                <div className="flex items-start space-x-3">
                  <LuCalendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">
                      Placed
                    </p>
                    <p className="font-medium text-gray-900 text-sm">
                      {moment(order.createdAt).format(
                        'MMM D, YYYY [at] hh:mm A'
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
                      <p className="font-medium text-gray-900 text-sm">
                        {moment(order.orderAudit.processedAt).format(
                          'MMM D, YYYY [at] hh:mm A'
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
                      <p className="font-medium text-gray-900 text-sm">
                        {moment(order.orderAudit.inTransitAt).format(
                          'MMM D, YYYY [at] hh:mm A'
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
                      <p className="font-medium text-gray-900 text-sm">
                        {moment(order.orderAudit.deliveredAt).format(
                          'MMM D, YYYY [at] hh:mm A'
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
                      <p className="font-medium text-gray-900 text-sm">
                        {moment(order.orderAudit.cancelledAt).format(
                          'MMM D, YYYY [at] hh:mm A'
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailSection
