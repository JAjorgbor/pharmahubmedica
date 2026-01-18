'use client'

import React, { useEffect } from 'react'
import { Button } from '@heroui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ModalWrapper from '@/components/elements/modal-wrapper'
import InputField from '@/components/elements/input-field'
import { IDeliveryAddress } from '@/api-client/interfaces/delivery-address.interfaces'

const addressSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  phoneNumber: z.string().min(10, 'Valid phone number is required'),
  street: z.string().min(3, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  country: z.string(),
  postalCode: z.string().optional(),
})

type AddressFormData = z.infer<typeof addressSchema>

interface AddEditAddressModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => Promise<void>
  initialData?: IDeliveryAddress
}

const AddEditAddressModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: AddEditAddressModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      country: 'Nigeria',
    },
  })

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset(initialData)
      } else {
        reset({
          country: 'Nigeria',
          label: '',
          phoneNumber: '',
          street: '',
          city: '',
          state: '',
          postalCode: '',
        })
      }
    }
  }, [isOpen, initialData, reset])

  const onFormSubmit = async (data: AddressFormData) => {
    await onSubmit({ ...initialData, ...data }) // Maintain ID if editing
    onClose()
  }

  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={onClose}
      title={initialData ? 'Edit Address' : 'Add New Address'}
      size="2xl"
      footer={
        <div className="flex justify-end w-full gap-4">
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="addEditAddressForm"
            color="primary"
            isLoading={isSubmitting}
          >
            {initialData ? 'Update Address' : 'Save Address'}
          </Button>
        </div>
      }
    >
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        id="addEditAddressForm"
        className="grid md:grid-cols-2 gap-4"
      >
        <InputField
          type="text"
          label="Label (e.g., Home, Office)"
          placeholder="Home"
          controllerProps={{ control, name: 'label' }}
        />
        <InputField
          type="phoneNumber"
          label="Phone Number"
          placeholder="0800 000 0000"
          controllerProps={{ control, name: 'phoneNumber' }}
        />
        <div className="md:col-span-2">
          <InputField
            type="text"
            label="Street Address"
            placeholder="123 Main St"
            controllerProps={{ control, name: 'street' }}
          />
        </div>
        <InputField
          type="text"
          label="City"
          placeholder="Asokoro"
          controllerProps={{ control, name: 'city' }}
        />
        <InputField
          type="text"
          label="State"
          placeholder="Abuja"
          controllerProps={{ control, name: 'state' }}
        />

        <InputField
          type="text"
          label="Country"
          disabled
          controllerProps={{ control, name: 'country' }}
        />
        <InputField
          type="text"
          label="Postal Code (Optional)"
          placeholder="100001"
          controllerProps={{ control, name: 'postalCode' }}
        />
      </form>
    </ModalWrapper>
  )
}

export default AddEditAddressModal
