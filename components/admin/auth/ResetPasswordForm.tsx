'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { addToast, Button } from '@heroui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import Cookies from 'js-cookie'
import InputField from '@/components/elements/input-field'
import { setNewPassword } from '@/api-client/admin/requests/auth.requests'
import { useState } from 'react'

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
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const firstName = searchParams.get('firstName')
  const [keepLoading, setkeepLoading] = useState(false)

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
    if (!token) {
      addToast({
        title: 'Reset token is missing from the URL.',
        color: 'danger',
      })
      return
    }

    try {
      const { data: res } = await setNewPassword(token, {
        password: data.password,
      })
      setkeepLoading(true)

      // Save auth details
      Cookies.set('adminAccessToken', res.accessToken, { expires: 60 })
      Cookies.set('adminUserId', res.user._id, { expires: 60 })

      addToast({
        title: 'Password reset successfully!',
        color: 'success',
      })

      router.push('/admin/dashboard')
    } catch (error: any) {
      addToast({
        title:
          error?.data?.message ||
          error?.message ||
          'Failed to reset password. Please try again.',
        color: 'danger',
      })
    }
  }

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          {firstName
            ? `Hello ${firstName}, reset your password`
            : 'Reset Password'}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your new password below to secure your account.
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
          isLoading={isSubmitting || keepLoading}
        >
          Reset Password
        </Button>
      </form>
    </div>
  )
}
