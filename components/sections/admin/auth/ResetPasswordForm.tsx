'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { toast } from 'react-toastify'
import InputField from '@/components/elements/input-field'

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordForm() {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: ResetPasswordFormValues) => {
    // Here we would typically call the reset password API
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success(
      'Password reset successfully! Please login with your new password.'
    )
    router.push('/admin')
  }

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          Reset Password
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your new password below.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          type="password"
          label="New Password"
          placeholder="••••••••"
          controllerProps={{
            name: 'password',
            control,
          }}
          isRequired
        />

        <InputField
          type="password"
          label="Confirm New Password"
          placeholder="••••••••"
          controllerProps={{
            name: 'confirmPassword',
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
          Reset Password
        </Button>
      </form>
    </div>
  )
}
