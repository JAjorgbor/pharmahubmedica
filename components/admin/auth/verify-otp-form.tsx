'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@heroui/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { HiArrowLeft } from 'react-icons/hi'
import InputField from '@/components/elements/input-field'

const verifyOtpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
})

type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>

export default function VerifyOtpForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: '',
    },
  })

  const onSubmit = async (data: VerifyOtpFormValues) => {
    // Here we would typically call the verify OTP API
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push(
      `/admin/reset-password?email=${encodeURIComponent(email)}&otp=${data.otp}`,
    )
  }

  return (
    <div className="w-full">
      <div className="">
        <Link
          href="/admin/forgot-password"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
        >
          <HiArrowLeft className="mr-2" size={16} />
          Back
        </Link>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          Verify OTP
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          We've sent a 6-digit code to{' '}
          <span className="font-semibold text-gray-900">{email}</span>. Enter it
          below to continue.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-center">
          <InputField
            type="passCode"
            codeLength={6}
            controllerProps={{
              name: 'otp',
              control,
            }}
          />
        </div>

        <Button
          type="submit"
          color="primary"
          className="w-full py-6 text-base font-semibold"
          isLoading={isSubmitting}
        >
          Verify Code
        </Button>

        <p className="text-center text-sm text-gray-600">
          Didn't receive the code?{' '}
          <button
            type="button"
            className="font-medium text-primary hover:text-blue-700 transition-colors"
            onClick={() => console.log('Resend OTP')}
          >
            Resend
          </button>
        </p>
      </form>
    </div>
  )
}
