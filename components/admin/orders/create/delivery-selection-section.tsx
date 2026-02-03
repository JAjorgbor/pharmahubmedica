'use client'

import React, { useState } from 'react'
import {
  Card,
  CardBody,
  Button,
  RadioGroup,
  Radio,
  Skeleton,
  addToast,
} from '@heroui/react'
import { LuPlus, LuMapPin } from 'react-icons/lu'
import { useGetAdminDeliveryAddresses } from '@/hooks/requests/admin/useAdminDeliveryAddress'
import { useGetAdminDeliveryMethods } from '@/hooks/requests/admin/useGetAdminDeliveryMethods'
import AddEditAddressModal from '@/components/(site)/checkout/add-edit-address-modal'
import { adminDeliveryAddressRequests } from '@/api-client/admin/requests/delivery-address.requests'
import { currencyFormatter } from '@/utils/currency-formatter'

interface DeliverySelectionSectionProps {
  userId: string
  selectedAddressId: string
  selectedMethodId: string
  onAddressSelect: (id: string) => void
  onMethodSelect: (id: string) => void
}

const DeliverySelectionSection = ({
  userId,
  selectedAddressId,
  selectedMethodId,
  onAddressSelect,
  onMethodSelect,
}: DeliverySelectionSectionProps) => {
  const { addresses, addressesLoading, mutateAddresses } =
    useGetAdminDeliveryAddresses(userId)
  const { deliveryMethods, deliveryMethodsLoading } =
    useGetAdminDeliveryMethods()
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)

  const handleAddAddress = async (data: any) => {
    try {
      await adminDeliveryAddressRequests.createDeliveryAddress(userId, data)
      addToast({
        title: 'Address added',
        color: 'success',
      })
      mutateAddresses()
      setIsAddressModalOpen(false)
    } catch (error: any) {
      addToast({
        title: error?.response?.data?.message || 'Failed to add address',
        color: 'danger',
      })
    }
  }

  if (addressesLoading || deliveryMethodsLoading) {
    return <Skeleton className="h-40 w-full rounded-xl" />
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">3. Delivery Details</h3>

      {/* Address Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-md font-medium text-default-600">
            Delivery Address
          </h4>
          <Button
            size="sm"
            color="primary"
            variant="flat"
            startContent={<LuPlus />}
            onPress={() => setIsAddressModalOpen(true)}
          >
            Add Address
          </Button>
        </div>

        {addresses.length === 0 ? (
          <div className="text-center py-4 border-2 border-dashed rounded-xl">
            <p className="text-foreground-500">
              No addresses found for customer.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <div
                key={address._id}
                className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${
                  selectedAddressId === address._id
                    ? 'border-primary bg-primary-50'
                    : 'border-default-200 hover:border-primary-200'
                }`}
                onClick={() => onAddressSelect(address._id)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <LuMapPin
                    className={
                      selectedAddressId === address._id
                        ? 'text-primary'
                        : 'text-default-500'
                    }
                  />
                  <span className="font-semibold">{address.label}</span>
                </div>
                <div className="text-sm text-foreground-600 space-y-1">
                  <p>{address.street}</p>
                  <p>
                    {address.city}, {address.state}
                  </p>
                  <p>{address.phoneNumber}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Method Section */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-default-600">
          Delivery Method
        </h4>
        <RadioGroup
          value={selectedMethodId}
          onValueChange={onMethodSelect}
          className="grid md:grid-cols-2 gap-4"
        >
          {deliveryMethods
            .filter((method) => method.visibility)
            .map((method) => (
              <Radio
                key={method._id}
                value={method._id}
                className={`border-2 rounded-xl p-4 m-0 max-w-none transition-all ${
                  selectedMethodId === method._id
                    ? 'border-primary bg-primary-50'
                    : 'border-default-200'
                }`}
              >
                <div className="flex justify-between w-full gap-4">
                  <div>
                    <p className="font-semibold">{method.name}</p>
                    <p className="text-sm text-foreground-500">
                      {method.estimatedDeliveryTime}
                    </p>
                  </div>
                  <p className="font-semibold text-primary">
                    {currencyFormatter(method.fee)}
                  </p>
                </div>
              </Radio>
            ))}
        </RadioGroup>
      </div>

      <AddEditAddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSubmit={handleAddAddress}
      />
    </div>
  )
}

export default DeliverySelectionSection
