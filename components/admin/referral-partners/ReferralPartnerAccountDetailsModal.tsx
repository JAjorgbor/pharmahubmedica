'use client'
import React from 'react'
import ModalWrapper from '@/components/elements/modal-wrapper'
import { Button, Tooltip } from '@heroui/react'
import { LuCheck, LuCopy } from 'react-icons/lu'
import { useState } from 'react'
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

  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  const DetailItem = ({
    label,
    value,
    copyable = false,
  }: {
    label: string
    value?: string
    copyable?: boolean
  }) => (
    <div className="space-y-1">
      <p className="text-xs text-foreground-500 font-medium uppercase tracking-wider">
        {label}
      </p>
      <div className="flex items-center gap-2 group">
        <p className="flex-1 text-sm font-semibold text-foreground-800 bg-default-50 p-3 rounded-lg border border-default-100 min-h-[46px] flex items-center">
          {value || '—'}
        </p>
        {copyable && value && (
          <Tooltip content={copied === label ? 'Copied!' : `Copy ${label}`}>
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              onPress={() => handleCopy(value, label)}
              className="shrink-0"
            >
              {copied === label ? (
                <LuCheck className="text-success h-4 w-4" />
              ) : (
                <LuCopy className="h-4 w-4" />
              )}
            </Button>
          </Tooltip>
        )}
      </div>
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
        <DetailItem
          label="Bank Name"
          value={accountDetails?.bankName}
          copyable
        />
        <DetailItem label="Bank Code" value={accountDetails?.bankCode} />
        <DetailItem
          label="Account Number"
          value={accountDetails?.accountNumber}
          copyable
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
