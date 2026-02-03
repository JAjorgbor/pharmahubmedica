'use client'

import React, { useState } from 'react'
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
} from '@heroui/react'

import UserSelectionSection from '@/components/admin/orders/create/user-selection-section'
import ProductSelectionSection from '@/components/admin/orders/create/product-selection-section'
import DeliverySelectionSection from '@/components/admin/orders/create/delivery-selection-section'
import OrderSummarySection from '@/components/admin/orders/create/order-summary-section'
import Link from 'next/link'
import { LuChevronLeft } from 'react-icons/lu'

const CreateOrderSection = () => {
  const [selectedUserId, setSelectedUserId] = useState<string>('')
  const [selectedProducts, setSelectedProducts] = useState<
    { productId: string; quantity: number }[]
  >([])
  const [selectedAddressId, setSelectedAddressId] = useState<string>('')
  const [selectedMethodId, setSelectedMethodId] = useState<string>('')

  return (
    <div className="space-y-6 max-w-7xl p-5 mx-auto">
      <Breadcrumbs className="mb-2">
        <BreadcrumbItem>
          <Link href="/admin/dashboard">Dashboard</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href="/admin/orders">Orders</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Create Order</BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex items-center gap-4">
        <Button isIconOnly as={Link} href="/admin/orders" variant="light">
          <LuChevronLeft size={25} />
        </Button>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-primary">Create Order</h1>

          <p className="text-default-500">Create a new order for a customer</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardBody className="p-6 space-y-8">
              <UserSelectionSection
                selectedUserId={selectedUserId}
                onSelect={(id) => {
                  setSelectedUserId(id)
                  setSelectedAddressId('') // Reset address if user changes
                }}
              />

              {selectedUserId && (
                <>
                  <div className="w-full h-px bg-default-200" />
                  <ProductSelectionSection
                    selectedProducts={selectedProducts}
                    onProductsChange={setSelectedProducts}
                  />
                </>
              )}

              {selectedUserId && selectedProducts.length > 0 && (
                <>
                  <div className="w-full h-px bg-default-200" />
                  <DeliverySelectionSection
                    userId={selectedUserId}
                    selectedAddressId={selectedAddressId}
                    selectedMethodId={selectedMethodId}
                    onAddressSelect={setSelectedAddressId}
                    onMethodSelect={setSelectedMethodId}
                  />
                </>
              )}
            </CardBody>
          </Card>
        </div>

        <div className="lg:col-span-1 sticky top-24">
          <OrderSummarySection
            userId={selectedUserId}
            products={selectedProducts}
            addressId={selectedAddressId}
            methodId={selectedMethodId}
          />
        </div>
      </div>
    </div>
  )
}

export default CreateOrderSection
