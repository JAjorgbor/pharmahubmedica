'use client'
import React from 'react'
import ModalWrapper from '@/components/elements/modal-wrapper'
import { Button } from '@heroui/react'
import { IReferralPartner } from '@/api-client/admin/interfaces/referral.interfaces'

interface IProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  referralPartner: IReferralPartner | null
}

const ReferralPartnerAccountDetailsModal = ({
  isOpen,
  setIsOpen,
  referralPartner,
}: IProps) => {
  const accountDetails = referralPartner?.accountDetails

  const DetailItem = ({ label, value }: { label: string; value?: string }) => (
    <div className="space-y-1">
      <p className="text-xs text-foreground-500 font-medium uppercase tracking-wider">
        {label}
      </p>
      <p className="text-sm font-semibold text-foreground-800 bg-default-50 p-3 rounded-lg border border-default-100">
        {value || '—'}
      </p>
    </div>
  )

  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Partner Account Details"
      size="md"
      footer={
        <div className="flex justify-end w-full">
          <Button color="primary" onPress={() => setIsOpen(false)}>
            Close
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
        <DetailItem label="Bank Name" value={accountDetails?.bankName} />
        <DetailItem label="Bank Code" value={accountDetails?.bankCode} />
        <DetailItem
          label="Account Number"
          value={accountDetails?.accountNumber}
        />
        <DetailItem label="Account Name" value={accountDetails?.accountName} />
      </div>
      {!accountDetails?.accountNumber && (
        <div className="mt-4 p-4 bg-warning-50 text-warning-700 rounded-lg text-sm border border-warning-100 italic">
          No account details have been provided for this referral partner yet.
        </div>
      )}
    </ModalWrapper>
  )
}

export default ReferralPartnerAccountDetailsModal
