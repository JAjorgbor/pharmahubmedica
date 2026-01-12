'use client'
import { updateReferralPartner } from '@/api-client/admin/requests/referral.requests'
import InputField from '@/components/elements/input-field'
import ModalWrapper from '@/components/elements/modal-wrapper'
import { addToast, Button } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { IReferralPartner } from '@/api-client/admin/interfaces/referral.interfaces'

interface IProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  onSuccess: () => void
  referralPartner: IReferralPartner | null
}

const UpdateReferralPartnerModal = ({
  isOpen,
  setIsOpen,
  onSuccess,
  referralPartner,
}: IProps) => {
  const schema = z.object({
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
    setValue,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      profession: 'other',
      commissionRate: 1.5,
    },
  })

  useEffect(() => {
    if (referralPartner) {
      setValue('profession', referralPartner.profession as any)
      setValue('commissionRate', referralPartner.commission?.rate || 0)
    }
  }, [referralPartner, setValue])

  const onSubmit = async (data: any) => {
    if (!referralPartner) return
    try {
      await updateReferralPartner(referralPartner._id, data)
      addToast({
        color: 'success',
        title: 'Referral partner updated successfully',
        severity: 'success',
      })
      onSuccess()
      handleClose()
    } catch (error: any) {
      console.error(error)
      addToast({
        color: 'danger',
        title:
          error?.response?.data?.message || 'Failed to update referral partner',
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
      title={`Update Referral Partner`}
      footer={
        <div className="flex justify-end w-full gap-4">
          <Button color="danger" onPress={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            form={'updateReferralPartnerForm'}
            isLoading={isSubmitting}
            color="primary"
          >
            Update Partner
          </Button>
        </div>
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="updateReferralPartnerForm"
        className="space-y-4"
      >
        <div className="space-y-1">
          <label className="text-sm font-medium">User</label>
          <div className="p-3 bg-default-100 rounded-lg text-sm text-default-600">
            {referralPartner?.user?.firstName}{' '}
            {referralPartner?.user?.lastName || ''} (
            {referralPartner?.user?.email})
          </div>
        </div>

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

export default UpdateReferralPartnerModal
