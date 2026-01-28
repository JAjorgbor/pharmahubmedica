'use client'
import { toggleReferralPartnerStatus } from '@/api-client/admin/requests/referral-partner.requests'
import ModalWrapper from '@/components/elements/modal-wrapper'
import { addToast, Button } from '@heroui/react'
import React, { useState } from 'react'
import { IReferralPartner } from '@/api-client/admin/interfaces/referral.interfaces'

interface IProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  onSuccess: () => void
  referralPartner: IReferralPartner | null
}

const ToggleReferralPartnerStatusModal = ({
  isOpen,
  setIsOpen,
  onSuccess,
  referralPartner,
}: IProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleToggle = async () => {
    if (!referralPartner) return
    setIsLoading(true)
    try {
      await toggleReferralPartnerStatus(referralPartner._id)
      addToast({
        color: 'success',
        title: `Referral partner ${
          referralPartner.status === 'active' ? 'deactivated' : 'activated'
        } successfully`,
        severity: 'success',
      })
      onSuccess()
      setIsOpen(false)
    } catch (error: any) {
      console.error(error)
      addToast({
        color: 'danger',
        title: 'Failed to toggle status',
        severity: 'danger',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const action =
    referralPartner?.status === 'active' ? 'deactivate' : 'activate'

  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={`${
        action === 'activate' ? 'Activate' : 'Deactivate'
      } Referral Partner`}
      footer={
        <div className="flex justify-end w-full gap-4">
          <Button
            color="default"
            variant="bordered"
            onPress={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            color={action === 'activate' ? 'success' : 'danger'}
            onPress={handleToggle}
          >
            {action === 'activate' ? 'Activate' : 'Deactivate'}
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <p className="text-foreground-600">
          Are you sure you want to <strong>{action}</strong> provider{' '}
          <span className="font-semibold">
            {referralPartner?.user?.firstName} {referralPartner?.user?.lastName}
          </span>
          ?
        </p>
        <p className="text-sm text-foreground-500">
          {action === 'deactivate'
            ? 'Deactivating this partner will prevent them from earning new commissions.'
            : 'Activating this partner will allow them to start earning commissions.'}
        </p>
      </div>
    </ModalWrapper>
  )
}

export default ToggleReferralPartnerStatusModal
