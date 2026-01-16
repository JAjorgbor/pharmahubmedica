import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Skeleton,
} from '@heroui/react'
import { useState } from 'react'
import { LuMapPin, LuPencil, LuPlus } from 'react-icons/lu'
import AddEditAddressModal from '@/components/(site)/checkout/add-edit-address-modal'
import { IDeliveryAddress } from '@/api-client/interfaces/delivery-address.interfaces'
import { useGetDeliveryAddresses } from '@/hooks/requests/portal/useGetDeliveryAddresses'
import Cookies from 'js-cookie'
import { portalDeliveryAddressRequests } from '@/api-client/portal/requests/delivery-address.requests'

interface DeliveryAddressSectionProps {
  selectedAddressId: string | null
  onSelectAddress: (id: string) => void
}

const DeliveryAddressSection = ({
  selectedAddressId,
  onSelectAddress,
}: DeliveryAddressSectionProps) => {
  const userId = Cookies.get('portalUserId')
  const { addresses, addressesLoading, mutateAddresses } =
    useGetDeliveryAddresses(userId)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<
    IDeliveryAddress | undefined
  >(undefined)

  const handleAddAddress = async (address: any) => {
    if (!userId) return
    try {
      const response =
        await portalDeliveryAddressRequests.createDeliveryAddress(
          userId,
          address
        )
      addToast({
        title: 'Address added successfully',
        color: 'success',
        severity: 'success',
      })
      mutateAddresses()
      onSelectAddress(response.data._id)
    } catch (error) {
      console.error('Failed to add address', error)
      addToast({
        title:
          error?.data?.message ||
          error?.message ||
          'Something went wrong. Please try again later',
        color: 'danger',
        severity: 'danger',
      })
    }
  }

  const handleEditAddress = async (updatedAddress: any) => {
    if (!userId || !updatedAddress._id) return
    try {
      await portalDeliveryAddressRequests.updateDeliveryAddress(
        userId,
        updatedAddress._id,
        updatedAddress
      )
      addToast({
        title: 'Address updated successfully',
        color: 'success',
        severity: 'success',
      })
      mutateAddresses()
    } catch (error) {
      console.error('Failed to update address', error)
      addToast({
        title:
          error?.data?.message ||
          error?.message ||
          'Something went wrong. Please try again later',
        color: 'danger',
        severity: 'danger',
      })
    }
  }

  const openAddModal = () => {
    setEditingAddress(undefined)
    setIsModalOpen(true)
  }

  const openEditModal = (address: IDeliveryAddress) => {
    setEditingAddress(address)
    setIsModalOpen(true)
  }

  if (addressesLoading) {
    return (
      <Card className="p-3">
        <CardHeader className="flex justify-between items-center pb-0">
          <Skeleton className="rounded-lg">
            <div className="h-8 w-40 bg-default-300"></div>
          </Skeleton>
          <Skeleton className="rounded-lg">
            <div className="h-8 w-32 bg-default-300"></div>
          </Skeleton>
        </CardHeader>
        <CardBody className="grid gap-4 md:grid-cols-2 mt-4">
          {[1, 2].map((i) => (
            <Card key={i} className="border-2 border-default-200 p-4 space-y-3">
              <Skeleton className="rounded-lg w-16 h-6" />
              <div className="space-y-2">
                <Skeleton className="rounded-lg w-3/4 h-4" />
                <Skeleton className="rounded-lg w-1/2 h-4" />
                <Skeleton className="rounded-lg w-2/3 h-4" />
              </div>
            </Card>
          ))}
        </CardBody>
      </Card>
    )
  }

  return (
    <Card className="p-3">
      <CardHeader className="flex justify-between items-center pb-0">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <LuMapPin className="text-primary" /> Delivery Address
        </h2>
        <Button
          size="sm"
          color="primary"
          variant="flat"
          startContent={<LuPlus />}
          onPress={openAddModal}
        >
          Add New Address
        </Button>
      </CardHeader>
      <CardBody className="space-y-4">
        {addresses.length === 0 ? (
          <div className="text-center py-8 text-foreground-500">
            <p>No addresses found. Please add a delivery address.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {addresses.map((address) => (
              <div
                key={address._id}
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all relative ${
                  selectedAddressId === address._id
                    ? 'border-primary bg-primary-50'
                    : 'border-default-200 hover:border-primary-300'
                }`}
                onClick={() => onSelectAddress(address._id!)}
              >
                <div className="flex justify-between items-start mb-2">
                  <Chip
                    size="sm"
                    variant={
                      selectedAddressId === address._id ? 'solid' : 'bordered'
                    }
                    color="primary"
                  >
                    {address.label}
                  </Chip>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={(e) => {
                      openEditModal(address)
                    }}
                    className="bg-transparent hover:bg-default-100"
                  >
                    <LuPencil size={16} />
                  </Button>
                </div>
                <div className="text-sm space-y-1 text-foreground-700">
                  <p className="font-semibold">{address.phoneNumber}</p>
                  <p>{address.street}</p>
                  <p>
                    {address.city}, {address.state}
                  </p>
                  <p>
                    {address.country}{' '}
                    {address.postalCode && `- ${address.postalCode}`}
                  </p>
                </div>
                {selectedAddressId === address._id && (
                  <div className="absolute -top-2 -right-2 bg-primary text-white p-1 rounded-full">
                    <LuMapPin size={12} fill="currentColor" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardBody>

      <AddEditAddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={editingAddress ? handleEditAddress : handleAddAddress}
        initialData={editingAddress as any}
      />
    </Card>
  )
}

export default DeliveryAddressSection
