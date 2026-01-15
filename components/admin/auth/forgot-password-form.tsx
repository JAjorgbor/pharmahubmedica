'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, addToast } from '@heroui/react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { HiArrowLeft, HiCheckCircle } from 'react-icons/hi'
import InputField from '@/components/elements/input-field'
import { resetPassword } from '@/api-client/admin/requests/auth.requests'
import { useState } from 'react'

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordForm() {
  const [isSuccess, setIsSuccess] = useState(false)
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
    try {
      await resetPassword(data)
      setIsSuccess(true)
    } catch (error: any) {
      addToast({
        title:
          error?.data?.message ||
          error?.message ||
          'Failed to send reset email. Please try again.',
        color: 'danger',
      })
    }
  }

  if (isSuccess) {
    return (
      <div className="w-full text-center">
        <div className="flex justify-center mb-6 text-success">
          <HiCheckCircle size={64} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          Check your email
        </h2>
        <p className="mt-4 text-gray-600">
          We've sent a password reset link to your email address. Please click
          the link in the email to reset your password.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 w-full text-left mt-2">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Tip:</span> The link
            expires after a short time. If you don't see the email, check your
            spam folder.
          </p>
        </div>
        <div className="mt-10">
          <Link
            href="/admin"
            className="text-sm font-semibold text-primary hover:text-blue-700"
          >
            Back to login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="!mb-0">
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
          Enter your email address and we'll send you a link to reset your
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
          Send Reset Link
        </Button>
      </form>
    </div>
  )
}
