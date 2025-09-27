'use client'
import { cn } from '@/utils/cn'
import React from 'react'
import { LuPhoneCall } from 'react-icons/lu'

const PhoneNumberDisplay = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex  gap-2 items-center ', className)}>
      <LuPhoneCall size={25} className="text-primary" />
      <div className="flex flex-col gap">
        <span className="text-sm font-semibold text-gray-600">
          Give us a Call
        </span>
        <a href="#" className="text-primary text-lg font-semibold">
          +234 800 000 0000
        </a>
      </div>
    </div>
  )
}

export default PhoneNumberDisplay
