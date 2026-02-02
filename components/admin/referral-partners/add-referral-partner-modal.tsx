'use client'
import { addReferralPartner } from '@/api-client/admin/requests/referral-partner.requests'
import InputField from '@/components/elements/input-field'
import ModalWrapper from '@/components/elements/modal-wrapper'
import useGetCustomersNotReferralPartners from '@/hooks/requests/admin/useGetCustomersNotReferralPartners'
import {
  useGetBanks,
  useVerifyAccountDetails,
} from '@/hooks/requests/admin/useBank'
import customValidation from '@/utils/custom-validation'
import { addToast, Button, Skeleton } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { z } from 'zod'

interface IProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  onSuccess: () => void
}

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

const AddReferralPartnerModal = ({ isOpen, setIsOpen, onSuccess }: IProps) => {
  const {
    customersNotReferrals,
    customersNotReferralsLoading,
    mutateCustomersNotReferrals,
  } = useGetCustomersNotReferralPartners()

  const [completeAccountQuery, setCompleteAccountQuery] = useState<{
    accountNumber: string | undefined
    bankCode: string | undefined
  }>({
    accountNumber: undefined,
    bankCode: undefined,
  })

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

  const { banks } = useGetBanks()
  const {
    accountDetails: verifiedAccountDetails,
    accountDetailsLoading,
    accountDetailsRevalidating,
  } = useVerifyAccountDetails(completeAccountQuery)

  const watchedBankName = watch('accountDetails.bankName')
  const watchedAccountNumber = watch('accountDetails.accountNumber')
  useEffect(() => {
    const accountNumber = watchedAccountNumber
    const bankCode = watch('accountDetails.bankCode')
    if (accountNumber?.length === 10 && bankCode) {
      setCompleteAccountQuery({ accountNumber, bankCode })
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
        <div className="grid md:grid-cols-2 gap-4">
          {customersNotReferralsLoading ? (
            <Skeleton className="rounded-xl h-10 w-full" />
          ) : (
            <InputField
              type="autocomplete"
              label="Select User"
              placeholder="Search and select user"
              className="md:col-span-2"
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
          <InputField
            type="autocomplete"
            label="Bank Name"
            options={banks?.map((each, index) => ({
              label: each.name,
              value: each.name,
            }))}
            placeholder="Search and select bank"
            className="md:col-span-2"
            controllerProps={{ control, name: 'accountDetails.bankName' }}
          />
          <InputField
            type="text"
            label="Account Number"
            noWhiteSpace
            className="md:col-span-2"
            placeholder="0000000000"
            controllerProps={{ control, name: 'accountDetails.accountNumber' }}
            maxLength={10}
          />
          <InputField
            type="text"
            label="Account Name"
            placeholder={
              accountDetailsRevalidating || watchedAccountNumber?.length > 0
                ? 'Fetching Account Name...'
                : 'Account name will show here'
            }
            className="md:col-span-2"
            disabled
            controllerProps={{ control, name: 'accountDetails.accountName' }}
          />
        </div>
      </form>
    </ModalWrapper>
  )
}

export default AddReferralPartnerModal
