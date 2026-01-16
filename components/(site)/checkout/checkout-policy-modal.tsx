'use client'

import { currencyFormatter } from '@/utils/currency-formatter'
import { Button } from '@heroui/react'
import { FaWhatsapp, FaCopy, FaCheck } from 'react-icons/fa'
import ModalWrapper from '@/components/elements/modal-wrapper'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface CheckoutPolicyModalProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  orderNumber: string
}

const CheckoutPolicyModal = ({
  isOpen,
  setIsOpen,
  orderNumber,
}: CheckoutPolicyModalProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(orderNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const PHARMAHUB_PHONE = '2349035784325' // Placeholder
  const whatsappUrl = `https://wa.me/${PHARMAHUB_PHONE}?text=${encodeURIComponent(
    `Hello, I would like to place an order. Order Number: ${orderNumber}`
  )}`

  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={() => setIsOpen(true)}
      hideCloseButton={true}
      headerFullWidth={false}
      footer={
        <div className="flex flex-col gap-4 w-full">
          <Button
            color="success"
            fullWidth
            size="lg"
            className="text-white font-semibold"
            as="a"
            href={whatsappUrl}
            target="_blank"
            // onPress={()=>setIsOpen(false)}
            startContent={<FaWhatsapp size={20} />}
          >
            Proceed to WhatsApp
          </Button>
          <div className="flex gap-2">
            <Button
              color="primary"
              variant="flat"
              fullWidth
              as={Link}
              href={'/collections'}
              className="flex-1"
            >
              Continue Shopping
            </Button>
            <Button
              color="primary"
              variant="ghost"
              fullWidth
              as={Link}
              href={'/portal/orders'}
              className="flex-1"
            >
              View Orders
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col text-center items-center gap-4">
        <div className="flex flex-col items-center">
          <FaWhatsapp size={48} className="text-success mb-2" />
          <h2 className="text-xl font-bold">Complete Order via WhatsApp</h2>
        </div>

        <div className="bg-warning-50 p-4 rounded-lg text-sm text-warning-700 w-full">
          <p>
            <strong>Policy Notice:</strong> To ensure your safety and proper
            guidance, all medication orders are processed directly by our
            licensed pharmacists via WhatsApp.
          </p>
        </div>

        <div className="space-y-2 w-full">
          <p className="text-foreground-600">
            Please provide this Order ID to the pharmacist:
          </p>
          <div
            className="flex justify-between items-center bg-default-100 p-3 rounded-lg border-2 border-default-200 cursor-pointer hover:border-primary transition-colors"
            onClick={handleCopy}
          >
            <span className="font-mono text-lg font-bold tracking-wider">
              {orderNumber}
            </span>
            <Button isIconOnly size="sm" variant="light" onPress={handleCopy}>
              {copied ? <FaCheck className="text-success" /> : <FaCopy />}
            </Button>
          </div>
          {copied && (
            <p className="text-xs text-success">
              Order ID copied to clipboard!
            </p>
          )}
        </div>

        <p className="text-sm text-foreground-500">
          Are you ready to chat with a pharmacist?
        </p>
      </div>
    </ModalWrapper>
  )
}

export default CheckoutPolicyModal
