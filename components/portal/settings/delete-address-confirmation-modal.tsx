'use client'
import React from 'react'
import ModalWrapper from '@/components/elements/modal-wrapper'
import { Button } from '@heroui/react'
import { IDeliveryAddress } from '@/api-client/interfaces/delivery-address.interfaces'

interface DeleteAddressConfirmationModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  address: IDeliveryAddress | null
  onConfirm: () => Promise<void>
  isLoading: boolean
}

const DeleteAddressConfirmationModal: React.FC<
  DeleteAddressConfirmationModalProps
> = ({ isOpen, setIsOpen, address, onConfirm, isLoading }) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Delete Address"
      size="sm"
      footer={
        <div className="flex gap-3 justify-end">
          <Button
            size="sm"
            variant="light"
            onPress={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            color="danger"
            isLoading={isLoading}
            onPress={onConfirm}
          >
            Delete
          </Button>
        </div>
      }
    >
      <div className="space-y-3">
        <p>
          Are you sure you want to delete the address{' '}
          <span className="font-bold text-primary">"{address?.label}"</span>?
        </p>
        <p className="text-sm text-foreground-500">
          This action cannot be undone. This address will be permanently removed
          from your profile.
        </p>
      </div>
    </ModalWrapper>
  )
}

export default DeleteAddressConfirmationModal
