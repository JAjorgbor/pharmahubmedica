'use client'
import AddEditAddressModal from '@/components/(site)/checkout/add-edit-address-modal'
import DeleteAddressConfirmationModal from './delete-address-confirmation-modal'
import type { FC } from 'react'

import { IDeliveryAddress } from '@/api-client/interfaces/delivery-address.interfaces'
import { portalDeliveryAddressRequests } from '@/api-client/portal/requests/delivery-address.requests'
import { useGetDeliveryAddresses } from '@/hooks/requests/portal/useGetDeliveryAddresses'
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
} from '@heroui/react'
import { useState } from 'react'
import { LuMapPin, LuPencil, LuPlus, LuTrash } from 'react-icons/lu'
import Cookies from 'js-cookie'

interface DeliveryAddressSettingsProps {}

const DeliveryAddressSettings: FC<DeliveryAddressSettingsProps> = ({}) => {
  const userId = Cookies.get('portalUserId')
  const { addresses, addressesLoading, mutateAddresses } =
    useGetDeliveryAddresses(userId)
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<
    IDeliveryAddress | undefined
  >(undefined)
  const [addressToDelete, setAddressToDelete] = useState<
    IDeliveryAddress | undefined
  >(undefined)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleAddAddress = async (address: any) => {
    if (!userId) return
    try {
      await portalDeliveryAddressRequests.createDeliveryAddress(userId, address)
      addToast({
        title: 'Address added successfully',
        color: 'success',
        severity: 'success',
      })
      mutateAddresses()
    } catch (error) {
      console.log('Failed to add address', error)
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
        updatedAddress,
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

  const handleDeleteAddress = async () => {
    if (!userId || !addressToDelete?._id) return
    setIsDeleting(true)
    try {
      await portalDeliveryAddressRequests.deleteDeliveryAddress(
        userId,
        addressToDelete._id,
      )
      addToast({
        title: 'Address deleted successfully',
        color: 'success',
        severity: 'success',
      })
      mutateAddresses()
      setIsDeleteModalOpen(false)
    } catch (error: any) {
      console.error('Failed to delete address', error)
      addToast({
        title:
          error?.data?.message ||
          error?.message ||
          'Something went wrong. Please try again later',
        color: 'danger',
        severity: 'danger',
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const openDeleteModal = (address: IDeliveryAddress) => {
    setAddressToDelete(address)
    setIsDeleteModalOpen(true)
  }

  const openAddModal = () => {
    setEditingAddress(undefined)
    setIsAddressModalOpen(true)
  }

  const openEditModal = (address: IDeliveryAddress) => {
    setEditingAddress(address)
    setIsAddressModalOpen(true)
  }

  return (
    <>
      <Card>
        <CardHeader className="pt-6 px-6 mb-0">
          <div className="flex justify-between items-center w-full">
            <div>
              <h2 className="text-primary text-md font-semibold">
                Delivery Addresses
              </h2>
              <p className="text-small text-default-500">
                Manage your delivery addresses
              </p>
            </div>
            <Button
              size="sm"
              color="primary"
              variant="flat"
              startContent={<LuPlus />}
              onPress={openAddModal}
            >
              Add Address
            </Button>
          </div>
        </CardHeader>
        <CardBody className="px-6">
          {addressesLoading ? (
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="border-2 border-default-200 rounded-xl p-4 space-y-6"
                >
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-5 w-2/3 rounded-xl" />

                    <div className="flex items-center gap-1">
                      <Skeleton className="h-6 w-6 rounded-xl" />
                      <Skeleton className="h-6 w-6 rounded-xl" />
                    </div>
                  </div>
                  <div className="text-sm space-y-1.5 text-foreground-700">
                    <Skeleton className="h-4 w-2/5 rounded-xl" />
                    <Skeleton className="h-4 w-1/2 rounded-xl" />
                    <Skeleton className="h-3 w-1/3 rounded-xl" />
                    <Skeleton className="h-3 w-1/2 rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : addresses.length === 0 ? (
            <div className="text-center py-8 text-foreground-500">
              <p>No delivery addresses found.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {addresses.map((address) => (
                <div
                  key={address._id}
                  className="border-2 border-default-200 rounded-xl p-4 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <LuMapPin className="h-4 w-4 text-primary" />
                      <span className="font-medium text-primary">
                        {address.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => openEditModal(address)}
                        className="text-default-600 hover:text-primary"
                      >
                        <LuPencil size={16} />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => openDeleteModal(address)}
                        className="text-danger hover:text-danger-600"
                      >
                        <LuTrash size={16} />
                      </Button>
                    </div>
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
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      <AddEditAddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSubmit={editingAddress ? handleEditAddress : handleAddAddress}
        initialData={editingAddress as any}
      />

      <DeleteAddressConfirmationModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        address={addressToDelete || null}
        onConfirm={handleDeleteAddress}
        isLoading={isDeleting}
      />
    </>
  )
}
export default DeliveryAddressSettings
