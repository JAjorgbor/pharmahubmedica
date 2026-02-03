'use client'

import React, { useState } from 'react'
import { Button, Card, CardBody, Divider, addToast } from '@heroui/react'
import { currencyFormatter } from '@/utils/currency-formatter'
import adminOrderRequests from '@/api-client/admin/requests/order.requests'
import { useRouter } from 'next/navigation'
import useGetAdminProducts from '@/hooks/requests/admin/useGetAdminProducts'
import { useGetAdminDeliveryMethods } from '@/hooks/requests/admin/useGetAdminDeliveryMethods'

interface OrderSummarySectionProps {
  userId: string
  products: { productId: string; quantity: number }[]
  addressId: string
  methodId: string
}

const OrderSummarySection = ({
  userId,
  products: selectedProducts,
  addressId,
  methodId,
}: OrderSummarySectionProps) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { products: allProducts } = useGetAdminProducts()
  const { deliveryMethods } = useGetAdminDeliveryMethods()

  const subTotal = selectedProducts.reduce((acc, item) => {
    const product = allProducts?.find((p) => p._id === item.productId)
    return acc + (product?.price || 0) * item.quantity
  }, 0)

  const deliveryMethod = deliveryMethods?.find((m) => m._id === methodId)
  const deliveryFee = deliveryMethod?.fee || 0
  const total = subTotal + deliveryFee

  const canPlaceOrder =
    userId && selectedProducts.length > 0 && addressId && methodId

  const handleCreateOrder = async () => {
    if (!canPlaceOrder) return

    setIsSubmitting(true)
    try {
      await adminOrderRequests.createOrder({
        customer: userId,
        items: selectedProducts,
        deliveryAddress: addressId,
        deliveryMethod: methodId,
      })
      addToast({
        title: 'Order created successfully',
        color: 'success',
      })
      router.push('/admin/orders')
    } catch (error: any) {
      addToast({
        title:
          error?.response?.data?.message ||
          error?.message ||
          'Failed to create order',
        color: 'danger',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="">
      <CardBody className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-foreground-500">Subtotal</span>
            <span className="font-medium">{currencyFormatter(subTotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground-500">Delivery Fee</span>
            <span className="font-medium">
              {currencyFormatter(deliveryFee)}
            </span>
          </div>
          <Divider />
          <div className="flex justify-between text-lg font-bold text-primary">
            <span>Total</span>
            <span>{currencyFormatter(total)}</span>
          </div>
        </div>

        <Button
          color="primary"
          size="lg"
          className="w-full font-semibold"
          isDisabled={!canPlaceOrder}
          isLoading={isSubmitting}
          onPress={handleCreateOrder}
        >
          Create Order
        </Button>

        {!canPlaceOrder && (
          <p className="text-xs text-danger text-center">
            Complete all steps to place order
          </p>
        )}
      </CardBody>
    </Card>
  )
}

export default OrderSummarySection
