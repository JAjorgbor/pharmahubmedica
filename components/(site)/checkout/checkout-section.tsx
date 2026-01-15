'use client'

import useCart from '@/hooks/useCart'
import { currencyFormatter } from '@/utils/currency-formatter'
import { addToast, Button, Card, CardBody, CardHeader } from '@heroui/react'
import { FaWhatsapp } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import DeliveryAddressSection from '@/components/(site)/checkout/delivery-address-section'
import DeliveryMethodSection from '@/components/(site)/checkout/delivery-method-section'
import { IDeliveryMethod } from '@/api-client/interfaces/delivery-method.interfaces'

import CheckoutPolicyModal from '@/components/(site)/checkout/checkout-policy-modal'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import z from 'zod'
import Cookies from 'js-cookie'
import { zodResolver } from '@hookform/resolvers/zod'
import { createOrder } from '@/api-client/portal/requests/order.requests'
import useGetPortalUser from '@/hooks/requests/useGetPortalUser'

const checkoutSchema = z.object({
  deliveryAddress: z.string(),
  deliveryMethod: z.string(),
})

type CheckoutSchema = z.infer<typeof checkoutSchema>

const CheckoutSection = () => {
  const { items, hasHydrated, clearCart } = useCart()
  const cartTotal = items.reduce((acc, item) => acc + item.amount, 0)
  const searchParams = useSearchParams()
  const orderNumberParam = searchParams.get('orderNumber')
  const [orderNumber, setOrderNumber] = useState(orderNumberParam || '')
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(!!orderNumberParam)
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  )
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] =
    useState<IDeliveryMethod | null>(null)
  const router = useRouter()
  const userId = Cookies.get('portalUserId')

  const { portalUser } = useGetPortalUser()

  useEffect(() => {
    if (!userId) {
      router.push(`/portal?callback=${encodeURIComponent('/checkout')}`)
    }
  }, [userId, router])

  const deliveryFee = selectedDeliveryMethod?.fee || 0
  const finalTotal = cartTotal + deliveryFee

  useEffect(() => {
    if (hasHydrated && items.length === 0 && !orderNumber) {
      router.push('/cart')
    }
  }, [items, hasHydrated, orderNumber])

  useEffect(() => {
    const subscribe = formMethods.watch((values) => console.log(values))
    return () => subscribe.unsubscribe()
  }, [])

  const formMethods = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
  })

  const handleSubmit = async (formData: CheckoutSchema) => {
    if (!portalUser)
      return addToast({
        title: 'User Not Logged In',
        color: 'warning',
        severity: 'warning',
      })
    try {
      const payload = {
        ...formData,
        items: items.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
        })),
        customer: portalUser._id,
      }
      const {
        data: { order: response },
      } = await createOrder(payload)
      setIsPolicyModalOpen(true)
      setOrderNumber(response.orderNumber)
      clearCart()
      router.replace(`/checkout?orderNumber=${response.orderNumber}`)
    } catch (error) {
      console.log(error)
      addToast({
        title:
          error?.data?.message || error?.message || 'Failed to create order',
        color: 'danger',
        severity: 'danger',
      })
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-5 ">
      <div className="grid md:grid-cols-3 gap-6 items-start">
        <form
          className="md:col-span-2 space-y-6"
          onSubmit={formMethods.handleSubmit(handleSubmit)}
          id="checkout-form"
        >
          <h1 className="text-3xl font-bold text-primary">Checkout</h1>

          <DeliveryAddressSection
            selectedAddressId={selectedAddressId}
            onSelectAddress={(id) => {
              setSelectedAddressId(id)
              formMethods.setValue('deliveryAddress', id)
            }}
          />

          <DeliveryMethodSection
            selectedMethodId={selectedDeliveryMethod?._id || null}
            onSelectMethod={(method) => {
              setSelectedDeliveryMethod(method)
              formMethods.setValue('deliveryMethod', method._id)
            }}
          />
        </form>

        <div className="md:col-span-1">
          <Card className="p-3 sticky top-24">
            <CardHeader className="font-bold text-2xl text-primary">
              Order Summary
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="space-y-2 text-sm">
                  {items.map((item, index) => (
                    <div className="flex justify-between" key={index}>
                      <span>
                        {item.product.name} x {item.quantity}
                      </span>
                      <span>{currencyFormatter(item.amount)}</span>
                    </div>
                  ))}
                </div>
                <hr className="border-foreground-300" />
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee</span>
                  <span>
                    {deliveryFee === 0 ? '—' : currencyFormatter(deliveryFee)}
                  </span>
                </div>
                <hr className="border-foreground-300" />
                <div className="flex justify-between text-xl font-bold">
                  Total{' '}
                  <span className="text-primary">
                    {currencyFormatter(finalTotal)}
                  </span>
                </div>
                <div className="space-y-2 pt-4">
                  <Button
                    fullWidth
                    startContent={<FaWhatsapp size={18} />}
                    color="success"
                    type="submit"
                    form="checkout-form"
                    className="text-white font-semibold"
                    isDisabled={!selectedAddressId || !selectedDeliveryMethod}
                    isLoading={formMethods.formState.isSubmitting}
                  >
                    Make Payment via WhatsApp
                  </Button>
                  <p className="text-center text-xs text-foreground-500">
                    {!selectedAddressId
                      ? 'Please select a delivery address'
                      : !selectedDeliveryMethod
                      ? 'Please select a delivery method'
                      : 'Complete your order via WhatsApp'}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <CheckoutPolicyModal
        isOpen={isPolicyModalOpen}
        setIsOpen={setIsPolicyModalOpen}
        orderNumber={orderNumber}
      />
    </div>
  )
}

export default CheckoutSection
