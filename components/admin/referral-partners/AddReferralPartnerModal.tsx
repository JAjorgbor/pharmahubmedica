'use client'
import { addReferralPartner } from '@/api-client/admin/requests/referral.requests'
import InputField from '@/components/elements/input-field'
import ModalWrapper from '@/components/elements/modal-wrapper'
import useGetCustomersNotReferralPartners from '@/hooks/requests/admin/useGetCustomersNotReferralPartners'
import { addToast, Button, Skeleton } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { z } from 'zod'

interface IProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  onSuccess: () => void
}

const AddReferralPartnerModal = ({ isOpen, setIsOpen, onSuccess }: IProps) => {
  const {
    customersNotReferrals,
    customersNotReferralsLoading,
    mutateCustomersNotReferrals,
  } = useGetCustomersNotReferralPartners()

  const customerOptions = useMemo(() => {
    return (
      customersNotReferrals?.map((customer) => ({
        label: `${customer.firstName} ${customer.lastName || ''} (${
          customer.email
        })`,
        value: customer._id,
      })) || []
    )
  }, [customersNotReferrals])

  const schema = z.object({
    user: z.string().min(1, 'Please select a user'),
    profession: z.enum([
      'doctor',
      'nurse',
      'pharmacist',
      'chemist',
      'lab technician',
      'other',
    ]),
    commissionRate: z.coerce
      .number()
      .min(0, 'Commission rate must be positive'),
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      user: '',
      profession: 'other',
      commissionRate: 1.5,
    },
  })

  const onSubmit = async (data: any) => {
    try {
      await addReferralPartner(data)
      addToast({
        color: 'success',
        title: 'Referral partner added successfully',
        severity: 'success',
      })
      mutateCustomersNotReferrals()
      onSuccess()

      handleClose()
    } catch (error: any) {
      console.error(error)
      addToast({
        color: 'danger',
        title:
          error?.response?.data?.message || 'Failed to add referral partner',
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
      setIsOpen={setIsOpen}
      title={`Add Referral Partner`}
      footer={
        <div className="flex justify-end w-full gap-4">
          <Button color="danger" onPress={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            form={'addReferralPartnerForm'}
            isLoading={isSubmitting}
            color="primary"
          >
            Add Partner
          </Button>
        </div>
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="addReferralPartnerForm"
        className="space-y-4"
      >
        {customersNotReferralsLoading ? (
          <Skeleton className="rounded-xl h-10 w-full" />
        ) : (
          <InputField
            type="autocomplete"
            label="Select User"
            placeholder="Search and select user"
            options={customerOptions}
            controllerProps={{ control, name: 'user' }}
          />
        )}
        <InputField
          type="select"
          label="Profession"
          options={[
            { label: 'Doctor', value: 'doctor' },
            { label: 'Nurse', value: 'nurse' },
            { label: 'Pharmacist', value: 'pharmacist' },
            { label: 'Chemist', value: 'chemist' },
            { label: 'Lab Technician', value: 'lab technician' },
            { label: 'Other', value: 'other' },
          ]}
          controllerProps={{ control, name: 'profession' }}
        />

        <InputField
          type="number"
          label="Commission Rate (%)"
          placeholder="Enter commission rate"
          controllerProps={{ control, name: 'commissionRate' }}
        />
      </form>
    </ModalWrapper>
  )
}

export default AddReferralPartnerModal
