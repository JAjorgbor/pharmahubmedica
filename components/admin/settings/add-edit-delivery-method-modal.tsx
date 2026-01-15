'use client'

import {
  ICreateDeliveryMethod,
  IDeliveryMethod,
} from '@/api-client/interfaces/delivery-method.interfaces'
import InputField from '@/components/elements/input-field'
import ModalWrapper from '@/components/elements/modal-wrapper'
import { addToast, Button, Switch } from '@heroui/react'
import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { LuTruck, LuClock, LuBanknote } from 'react-icons/lu'
import { adminDeliveryMethodRequests } from '@/api-client/admin/requests/admin.delivery-method.requests'

interface AddEditDeliveryMethodModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  initialData?: IDeliveryMethod
}

const AddEditDeliveryMethodModal = ({
  isOpen,
  onClose,
  onSuccess,
  initialData,
}: AddEditDeliveryMethodModalProps) => {
  const [loading, setLoading] = useState(false)
  const isEdit = !!initialData

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateDeliveryMethod>({
    defaultValues: {
      name: '',
      fee: 0,
      estimatedDeliveryTime: '',
      isActive: true,
      visibility: true,
    },
  })

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        fee: initialData.fee,
        estimatedDeliveryTime: initialData.estimatedDeliveryTime,
        isActive: initialData.isActive,
        visibility: initialData.visibility,
      })
    } else {
      reset({
        name: '',
        fee: 0,
        estimatedDeliveryTime: '',
        isActive: true,
        visibility: true,
      })
    }
  }, [initialData, reset, isOpen])

  const onSubmit = async (data: ICreateDeliveryMethod) => {
    setLoading(true)
    try {
      if (isEdit && initialData?._id) {
        await adminDeliveryMethodRequests.updateDeliveryMethod(
          initialData._id,
          data
        )
        addToast({
          title: 'Delivery method updated successfully',
          color: 'success',
          severity: 'success',
        })
      } else {
        await adminDeliveryMethodRequests.createDeliveryMethod(data)
        addToast({
          title: 'Delivery method created successfully',
          color: 'success',
          severity: 'success',
        })
      }
      onSuccess()
      onClose()
    } catch (error: any) {
      addToast({
        title: error?.data?.message || error?.message || 'Something went wrong',
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
      title={isEdit ? 'Edit Delivery Method' : 'Add Delivery Method'}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          type="text"
          label="Method Name"
          placeholder="e.g., Standard Shipping"
          startContent={<LuTruck className="text-foreground-400" />}
          controllerProps={{
            name: 'name',
            control,
            rules: { required: 'Name is required' },
          }}
        />

        <InputField
          label="Delivery Fee (₦)"
          type="amount"
          placeholder="0.00"
          startContent={<LuBanknote className="text-foreground-400" />}
          controllerProps={{
            name: 'fee',
            control,
            rules: {
              required: 'Fee is required',
              min: { value: 0, message: 'Fee cannot be negative' },
            },
          }}
        />

        <InputField
          type="text"
          label="Estimated Delivery Time"
          placeholder="e.g., 3-5 business days"
          startContent={<LuClock className="text-foreground-400" />}
          controllerProps={{
            name: 'estimatedDeliveryTime',
            control,
            rules: { required: 'Delivery time is required' },
          }}
        />

        <div className="flex gap-6 items-center">
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Active Status</span>
                <Switch
                  isSelected={field.value}
                  onValueChange={field.onChange}
                  size="sm"
                >
                  <span className="text-xs">
                    {field.value ? 'Active' : 'Inactive'}
                  </span>
                </Switch>
              </div>
            )}
          />

          <Controller
            name="visibility"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Visibility</span>
                <Switch
                  isSelected={field.value}
                  onValueChange={field.onChange}
                  size="sm"
                >
                  <span className="text-xs">
                    {field.value ? 'Visible' : 'Hidden'}
                  </span>
                </Switch>
              </div>
            )}
          />
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <Button variant="flat" color="danger" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" type="submit" isLoading={loading}>
            {isEdit ? 'Update Method' : 'Create Method'}
          </Button>
        </div>
      </form>
    </ModalWrapper>
  )
}

export default AddEditDeliveryMethodModal
