'use client'

import { IDeliveryMethod } from '@/api-client/interfaces/delivery-method.interfaces'
import ModalWrapper from '@/components/elements/modal-wrapper'
import { Button } from '@heroui/react'
import { useState } from 'react'
import { adminDeliveryMethodRequests } from '@/api-client/admin/requests/admin.delivery-method.requests'
import { addToast } from '@heroui/react'
import { FiAlertTriangle } from 'react-icons/fi'

interface DeleteDeliveryMethodModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  deliveryMethod?: IDeliveryMethod
}

const DeleteDeliveryMethodModal = ({
  isOpen,
  onClose,
  onSuccess,
  deliveryMethod,
}: DeleteDeliveryMethodModalProps) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!deliveryMethod?._id) return

    setLoading(true)
    try {
      await adminDeliveryMethodRequests.deleteDeliveryMethod(deliveryMethod._id)
      addToast({
        title: 'Delivery method deleted successfully',
        color: 'success',
        severity: 'success',
      })
      onSuccess()
      onClose()
    } catch (error: any) {
      addToast({
        title: error?.message || 'Failed to delete delivery method',
        color: 'danger',
        severity: 'danger',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={(open) => !open && onClose()}
      title="Delete Delivery Method"
      size="md"
    >
      <div className="flex flex-col items-center text-center gap-4 py-4">
        <div className="bg-danger-50 p-3 rounded-full">
          <FiAlertTriangle size={32} className="text-danger" />
        </div>
        <div className="space-y-2">
          <p className="font-bold text-lg">Are you absolutely sure?</p>
          <p className="text-foreground-500 text-sm">
            You are about to delete{' '}
            <span className="font-semibold text-foreground-900">
              {deliveryMethod?.name}
            </span>
            . This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-3 w-full mt-4">
          <Button
            variant="flat"
            fullWidth
            onPress={onClose}
            isDisabled={loading}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            fullWidth
            onPress={handleDelete}
            isLoading={loading}
          >
            Delete Method
          </Button>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default DeleteDeliveryMethodModal
