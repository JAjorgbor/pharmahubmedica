'use client'
import { updatePortalReferralProfile } from '@/api-client/portal/requests/referral-partner.requests'
import InputField from '@/components/elements/input-field'
import ModalWrapper from '@/components/elements/modal-wrapper'
import { addToast, Button, Chip } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { IReferralPartner } from '@/api-client/interfaces/referral-partner.interfaces'
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

const UpdatePortalReferralPartnerModal = ({
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
    try {
      await updatePortalReferralProfile(data)
      addToast({
        color: 'success',
        title: 'Referral details updated successfully',
        severity: 'success',
      })
      onSuccess()
      handleClose()
    } catch (error: any) {
      console.log(error)
      addToast({
        color: 'danger',
        title:
          error?.data?.message ||
          error?.message ||
          'Failed to update referral details',
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
      title={`Update Referral Details`}
      footer={
        <div className="flex justify-end w-full gap-4">
          <Button variant="light" onPress={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            form={'updatePortalReferralForm'}
            isLoading={isSubmitting}
            color="primary"
          >
            Save Changes
          </Button>
        </div>
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="updatePortalReferralForm"
        className="gap-4 grid md:grid-cols-2"
      >
        <div className="space-y-1 md:col-span-2">
          <p className="text-sm font-medium text-foreground-500">
            Commission Details
          </p>
          <div className="p-4 bg-default-50 rounded-xl border border-default-100 flex justify-between items-center">
            <div>
              <p className="text-xs uppercase font-bold text-foreground-400">
                Current Rate
              </p>
              <p className="text-xl font-bold text-success">
                {referralPartner?.commission?.rate || 0}%
              </p>
            </div>
            <Chip
              color={
                referralPartner?.status === 'active' ? 'success' : 'danger'
              }
              variant="flat"
              size="sm"
              className="capitalize"
            >
              {referralPartner?.status}
            </Chip>
          </div>
          <p className="text-[10px] text-foreground-400 italic">
            * Commission rate and status can only be modified by the
            administrator.
          </p>
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
          className="md:col-span-2"
        />

        <div className="md:col-span-2 pt-2">
          <p className="text-sm font-medium text-foreground-500 mb-2">
            Payout Account Details
          </p>
        </div>

        <InputField
          type="autocomplete"
          label="Bank Name"
          options={banks?.map((each) => ({
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
              : accountDetailsRevalidating
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

export default UpdatePortalReferralPartnerModal
