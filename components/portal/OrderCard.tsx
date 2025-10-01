import { Button, Card, CardBody, Chip } from '@heroui/react'
import { FaWhatsapp } from 'react-icons/fa'
import { LuCircleCheckBig, LuCircleX, LuClock, LuPackage } from 'react-icons/lu'

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

const OrderCard = ({ order }) => {
  return (
    <Card>
      <CardBody className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">{order.id}</h3>
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
          <Chip color={getStatusColor(order.status)}>
            <div className="flex items-center space-x-1">
              {getStatusIcon(order.status)}
              <span className="capitalize">{order.status}</span>
            </div>
          </Chip>
        </div>
        <div className="space-y-3 mb-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <img
                src={item.productImage || '/placeholder.svg'}
                alt={item.productName}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="font-bold">{item.productName}</p>
                <p className="text-sm text-muted-foreground">
                  Quantity: {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </div>
              <p className="font-bold">${item.totalPrice.toFixed(2)}</p>
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
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-lg font-bold">
            Total: ${order.totalAmount.toFixed(2)}
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm">
              <FaWhatsapp className="mr-2 h-4 w-4 text-medium font-bold" />
              Contact Support
            </Button>
            {order.status === 'fulfilled' && (
              <Button
                size="sm"
                className="bg-[#031D91] hover:bg-blue-800 text-white"
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
