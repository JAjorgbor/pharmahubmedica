'use client'
import { updateReferralPartner } from '@/api-client/admin/requests/referral-partner.requests'
import InputField from '@/components/elements/input-field'
import ModalWrapper from '@/components/elements/modal-wrapper'
import { addToast, Button } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { IReferralPartner } from '@/api-client/admin/interfaces/referral.interfaces'
import customValidation from '@/utils/custom-validation'
import { useGetBanks, useVerifyAccountDetails } from '@/hooks/requests/useBank'

interface IProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  onSuccess: () => void
  referralPartner: IReferralPartner | null
}
const schema = z.object({
  profession: z.enum([
    'doctor',
    'nurse',
    'pharmacist',
    'chemist',
    'lab technician',
    'other',
  ]),
  commissionRate: z.coerce.number().min(0, 'Commission rate must be positive'),
  accountDetails: z.object({
    accountName: customValidation.required(
      z.string(),
      'Account name is required',
    ),
    bankName: customValidation.required(z.string(), 'Bank name is required'),
    accountNumber: customValidation.required(
      z.string(),
      'Account number is required',
    ),
    bankCode: customValidation.required(z.string(), 'Bank code is required'),
  }),
})

const UpdateReferralPartnerModal = ({
  isOpen,
  setIsOpen,
  onSuccess,
  referralPartner,
}: IProps) => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      profession: 'other',
      commissionRate: 1.5,
    },
  })

  const [completeAccountQuery, setCompleteAccountQuery] = useState<{
    account_number: string | undefined
    bank_code: string | undefined
  }>({
    account_number: undefined,
    bank_code: undefined,
  })

  useEffect(() => {
    if (referralPartner) {
      reset({
        profession: referralPartner.profession as any,
        commissionRate: referralPartner.commission?.rate || 0,
        accountDetails: {
          accountName: referralPartner.accountDetails?.accountName || '',
          bankName: referralPartner.accountDetails?.bankName || '',
          accountNumber: referralPartner.accountDetails?.accountNumber || '',
          bankCode: referralPartner.accountDetails?.bankCode || '',
        },
      })
    }
  }, [JSON.stringify(referralPartner), isOpen])

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
    setIsOpen(false)
  }
  const { banks } = useGetBanks()
  const {
    accountDetails: verifiedAccountDetails,
    accountDetailsError,
    accountDetailsRevalidating,
  } = useVerifyAccountDetails(completeAccountQuery)

  const watchedBankName = watch('accountDetails.bankName')

  const watchedAccountNumber = watch('accountDetails.accountNumber')
  useEffect(() => {
    const account_number = watchedAccountNumber
    const bankCode = watch('accountDetails.bankCode')
    if (account_number?.length === 10 && bankCode) {
      setCompleteAccountQuery({ account_number, bank_code: bankCode })
      setValue(
        'accountDetails.accountName',
        verifiedAccountDetails?.account_name,
      )
    } else if (
      !accountDetailsRevalidating &&
      watchedAccountNumber?.length < 10
    ) {
      setValue('accountDetails.accountName', '')
    }
  }, [
    watchedAccountNumber,
    watch('accountDetails.bankCode'),
    accountDetailsRevalidating,
    verifiedAccountDetails?.account_name,
  ])

  useEffect(() => {
    if (watchedBankName) {
      const bank = banks?.find((each) => each.name === watchedBankName)
      if (bank) {
        setValue('accountDetails.bankCode', bank.code)
      }
    }
  }, [watchedBankName])

  useEffect(() => {
    if (verifiedAccountDetails) {
      setValue(
        'accountDetails.accountName',
        verifiedAccountDetails.account_name,
      )
    }
  }, [verifiedAccountDetails])

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
        className="gap-4 grid md:grid-cols-2"
      >
        <div className="space-y-1 md:col-span-2">
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
        <InputField
          type="autocomplete"
          label="Bank Name"
          options={banks?.map((each, index) => ({
            label: each.name,
            value: each.name,
          }))}
          placeholder="Search and select bank"
          className="md:col-span-2"
          controllerProps={{
            control,
            name: 'accountDetails.bankName',
          }}
        />
        <InputField
          type="text"
          label="Account Number"
          noWhiteSpace
          className="md:col-span-2"
          placeholder="0000000000"
          controllerProps={{ control, name: 'accountDetails.accountNumber' }}
        />
        <InputField
          type="text"
          label="Account Name"
          placeholder={
            accountDetailsError
              ? 'Incorrect account details'
              : accountDetailsRevalidating || watchedAccountNumber?.length > 0
                ? 'Fetching Account Name...'
                : 'Account name will show here'
          }
          className="md:col-span-2"
          disabled
          controllerProps={{ control, name: 'accountDetails.accountName' }}
        />
      </form>
    </ModalWrapper>
  )
}

export default UpdateReferralPartnerModal
