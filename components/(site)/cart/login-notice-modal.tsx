'use client'

import { Button } from '@heroui/react'
import { LuUserX, LuLogIn, LuUserPlus } from 'react-icons/lu'
import ModalWrapper from '@/components/elements/modal-wrapper'
import Link from 'next/link'

interface LoginNoticeModalProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

const LoginNoticeModal = ({ isOpen, setIsOpen }: LoginNoticeModalProps) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      hideCloseButton={false}
      headerFullWidth={false}
      title="Login Required"
      footer={
        <div className="flex flex-col gap-3 w-full">
          <Button
            color="primary"
            fullWidth
            className="font-semibold"
            as={Link}
            href="/portal/create-account?callback=/checkout"
            startContent={<LuUserPlus size={20} />}
          >
            Create Account
          </Button>
          <Button
            color="primary"
            variant="bordered"
            fullWidth
            className="font-semibold"
            as={Link}
            href="/portal?callback=/checkout"
            startContent={<LuLogIn size={20} />}
          >
            Login to Existing Account
          </Button>
        </div>
      }
    >
      <div className="flex flex-col text-center items-center gap-4 py-2">
        <div className="flex flex-col items-center">
          <div className="bg-warning-100 p-4 rounded-full mb-3">
            <LuUserX size={48} className="text-warning-600" />
          </div>
          <h2 className="text-xl font-bold">Account Required</h2>
        </div>

        <div className="bg-primary-50 p-4 rounded-lg text-sm text-primary-700 w-full">
          <p>
            <strong>Notice:</strong> You need to be logged in to process an
            order. Please create an account or login to your existing account to
            continue to checkout.
          </p>
        </div>

        <p className="text-sm text-foreground-500">
          After logging in, you'll be redirected back to the checkout page to
          complete your order.
        </p>
      </div>
    </ModalWrapper>
  )
}

export default LoginNoticeModal
