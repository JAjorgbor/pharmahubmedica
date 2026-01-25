'use client'

import { setNewPassword } from '@/api-client/portal/requests/auth.requests'
import InputField from '@/components/elements/input-field'
import { addToast, Button, Card, CardBody } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Cookies from 'js-cookie'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdOutlineLockReset } from 'react-icons/md'
import { z } from 'zod'

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordForm() {
  const [keepLoading, setKeepLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

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

      setKeepLoading(true)
      Cookies.set('portalAccessToken', res.accessToken)
      Cookies.set('portalUserId', res.user._id, { expires: 60 })

      addToast({
        title: 'Password reset successfully!',
        color: 'success',
      })

      router.push('/portal/dashboard')
    } catch (error: any) {
      addToast({
        title:
          error?.data?.error ||
          error?.data?.message ||
          error?.message ||
          'Failed to reset password. Please try again.',
        color: 'danger',
      })
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardBody className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputField
            type="password"
            label="Password"
            placeholder="••••••••"
            controllerProps={{
              name: 'password',
              control,
            }}
            isRequired
          />

          <InputField
            type="password"
            label="Confirm Password"
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
            <MdOutlineLockReset className="h-6 w-6" />
            Reset Password
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}
