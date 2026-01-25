import { IOrder } from '@/api-client/interfaces/order.interfaces'
import { Button, Card, CardBody, Chip } from '@heroui/react'
import Image from 'next/image'
import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'
import {
  LuCircleCheckBig,
  LuCircleX,
  LuClock,
  LuEye,
  LuPackage,
} from 'react-icons/lu'
import { currencyFormatter } from '@/utils/currency-formatter'
import moment from 'moment'
import { toWhatsAppNumber } from '@/utils/to-whatsapp-number'
import useGetApp from '@/hooks/requests/useGetApp'

const getStatusIcon = (status: string) => {
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

const OrderCard = ({ order }: { order: IOrder }) => {
  const { app } = useGetApp()
  return (
    <Card>
      <CardBody className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
          <div>
            <h3 className="font-semibold text-lg">{order.orderNumber}</h3>
            <p className="text-sm text-foreground-500">
              Ordered on {moment(order.createdAt).format('D MMMM, YYYY')}
            </p>
            {order.orderAudit.deliveredAt !== 'not-available' && (
              <p className="text-sm text-foreground-500">
                Delivered on{' '}
                {moment(order.orderAudit.deliveredAt).format('D MMMM, YYYY')}
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <Chip
              color={getStatusColor(order.orderStatus)}
              size="sm"
              variant="flat"
            >
              <div className="flex items-center space-x-1">
                {getStatusIcon(order.orderStatus)}
                <span className="capitalize">{order.orderStatus}</span>
              </div>
            </Chip>
            <Chip
              color={getPaymentStatusColor(order.paymentStatus)}
              size="sm"
              variant="dot"
              className="border-none"
            >
              <span className="capitalize text-xs font-semibold">
                {order.paymentStatus}
              </span>
            </Chip>
          </div>
        </div>
        <div className="space-y-3 mb-4">
          {order.products.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  {item.productImage ? (
                    <img
                      src={item.productImage?.url}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <LuPackage className="text-gray-400" size={24} />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-bold">{item.productName}</p>
                  <p className="text-sm text-foreground-500">
                    Quantity: {item.quantity} × {currencyFormatter(item.price)}
                  </p>
                </div>
              </div>
              <p className="font-bold text-right sm:text-left">
                {currencyFormatter(item.amount)}
              </p>
            </div>
          ))}
        </div>
        {order.note && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm">
              <strong className="mr-1">Notes:</strong> {order.note}
            </p>
          </div>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-t-foreground-200">
          <div className="text-lg font-bold text-center sm:text-left">
            Total: {currencyFormatter(order.transaction.totalAmount)}
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              as={Link}
              href={`https://wa.me/${toWhatsAppNumber(app?.whatsAppNumber, 'NG')}`}
              target="_blank"
            >
              <FaWhatsapp className="mr-2 h-4 w-4 text-medium font-bold" />
              Contact Support
            </Button>
            <Button
              as={Link}
              href={`/portal/orders/${order._id}`}
              variant="ghost"
              size="sm"
            >
              <LuEye className="mr-2 h-4 w-4 text-medium font-bold" />
              View Order
            </Button>
            {order.orderStatus === 'delivered' && (
              <Button
                size="sm"
                className="bg-primary hover:bg-blue-800 text-white"
              >
                Reorder
              </Button>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default OrderCard
