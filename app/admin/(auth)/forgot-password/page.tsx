'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@heroui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { HiArrowLeft } from 'react-icons/hi'

import InputField from '@/components/elements/input-field'

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    console.log('Forgot password data:', data)
    // Here we would typically call the forgot password API
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // Move to verify OTP step, passing email if needed (can use query params or state)
    router.push(`/admin/verify-otp?email=${encodeURIComponent(data.email)}`)
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <Link
          href="/admin"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
        >
          <HiArrowLeft className="mr-2" size={16} />
          Back to login
        </Link>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          Forgot Password
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your email address and we'll send you an OTP to reset your
          password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          type="email"
          label="Email Address"
          placeholder="admin@pharmahubmedica.ng"
          controllerProps={{
            name: 'email',
            control,
          }}
          isRequired
        />

        <Button
          type="submit"
          color="primary"
          className="w-full py-6 text-base font-semibold"
          isLoading={isSubmitting}
        >
          Send OTP
        </Button>
      </form>
    </div>
  )
}
