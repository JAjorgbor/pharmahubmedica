import { IOrder } from '@/library/dummy-data'
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

const OrderCard = ({ order }: { order: IOrder }) => {
  return (
    <Card>
      <CardBody className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
          <div>
            <h3 className="font-semibold text-lg">{order._id}</h3>
            <p className="text-sm text-muted-foreground">
              Ordered on {new Date(order.orderDate).toLocaleDateString()}
            </p>
            {order.fulfillmentDate && (
              <p className="text-sm text-muted-foreground">
                Fulfilled on{' '}
                {new Date(order.fulfillmentDate).toLocaleDateString()}
              </p>
            )}
          </div>
          <Chip
            color={getStatusColor(order.status)}
            size="sm"
            variant="flat"
            className="self-start sm:self-auto"
          >
            <div className="flex items-center space-x-1">
              {getStatusIcon(order.status)}
              <span className="capitalize">{order.status}</span>
            </div>
          </Chip>
        </div>
        <div className="space-y-3 mb-4">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <Image
                width={48}
                height={48}
                src={item.productImage || '/placeholder.svg'}
                alt={item.productName}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="font-bold">{item.productName}</p>
                <p className="text-sm text-foreground-500">
                  Quantity: {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </div>
              <p className="font-bold text-right sm:text-left">
                ${item.totalPrice.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        {order.notes && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm">
              <strong className="mr-1">Notes:</strong> {order.notes}
            </p>
          </div>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-t-foreground-200">
          <div className="text-lg font-bold text-center sm:text-left">
            Total: ${order.totalAmount.toFixed(2)}
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end gap-2">
            <Button variant="ghost" size="sm">
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
            {order.status === 'fulfilled' && (
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
