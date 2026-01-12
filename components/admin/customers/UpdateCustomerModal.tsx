'use client'
import { ICustomer } from '@/api-client/admin/interfaces/customer.interfaces'
import { updateCustomer } from '@/api-client/admin/requests/customer.requests'
import InputField from '@/components/elements/input-field'
import ModalWrapper from '@/components/elements/modal-wrapper'
import { addToast } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface IProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  customer: ICustomer | null
  onSuccess: () => void
}

const UpdateCustomerModal = ({
  isOpen,
  setIsOpen,
  customer,
  onSuccess,
}: IProps) => {
  const schema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email(),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    status: z.enum(['pending', 'active', 'inactive', 'waitlist']),
  })

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      status: 'pending' as const,
    },
  })

  useEffect(() => {
    if (customer) {
      setValue('firstName', customer.firstName)
      setValue('lastName', customer.lastName || '')
      setValue('email', customer.email)
      setValue('phoneNumber', customer.phoneNumber || '')
      setValue('status', customer.status as any)
    }
  }, [customer, setValue])

  const onSubmit = async (data: any) => {
    if (!customer?._id) return

    try {
      await updateCustomer(customer._id, data)
      addToast({
        title: 'Customer updated successfully',
        color: 'success',
        severity: 'success',
      })
      onSuccess()
      handleClose()
    } catch (error: any) {
      console.error(error)
      addToast({
        title: error?.response?.data?.message || 'Failed to update customer',
        color: 'danger',
        severity: 'danger',
      })
    }
  }

  const handleClose = () => {
    reset()
    setIsOpen(false)
  }

  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={handleClose}
      title={`Update Customer`}
      footer={
        <div className="flex justify-end w-full gap-4">
          <button
            onClick={handleClose}
            className="px-6 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <InputField
            type="text"
            label="First Name"
            placeholder="Enter first name"
            controllerProps={{ control, name: 'firstName' }}
          />
          <InputField
            type="text"
            label="Last Name"
            placeholder="Enter last name"
            controllerProps={{ control, name: 'lastName' }}
          />
        </div>

        <InputField
          type="email"
          label="Email Address"
          placeholder="Enter email address"
          controllerProps={{ control, name: 'email' }}
        />

        <InputField
          type="phoneNumber"
          label="Phone Number"
          placeholder="Enter phone number"
          controllerProps={{ control, name: 'phoneNumber' }}
        />

        <InputField
          type="select"
          label="Status"
          options={[
            { label: 'Pending', value: 'pending' },
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
            { label: 'Waitlist', value: 'waitlist' },
          ]}
          controllerProps={{ control, name: 'status' }}
        />
      </form>
    </ModalWrapper>
  )
}

export default UpdateCustomerModal
