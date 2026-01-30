'use client'
import { cn } from '@/utils/cn'
import React from 'react'
import { LuPhoneCall } from 'react-icons/lu'

import useGetApp from '@/hooks/requests/useGetApp'

const PhoneNumberDisplay = ({ className }: { className?: string }) => {
  const { app } = useGetApp()
  const displayPhone = app?.phoneNumber || ''

  return (
    <div className={cn('flex  gap-2 items-center ', className)}>
      <LuPhoneCall size={25} className="text-primary" />
      <div className="flex flex-col gap">
        <span className="text-sm font-semibold text-gray-600">
          Give us a Call
        </span>
        <a
          href={`tel:${displayPhone}`}
          className="text-primary text-lg font-semibold"
        >
          {displayPhone}
        </a>
      </div>
    </div>
  )
}

export default PhoneNumberDisplay
