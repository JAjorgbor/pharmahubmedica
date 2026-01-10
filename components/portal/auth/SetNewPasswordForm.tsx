'use client'

import InputField from '@/components/elements/input-field'
import { addToast, Button } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdOutlineLockReset } from 'react-icons/md'
import { z } from 'zod'

const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
})

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordForm() {
  const [keepLoading, setKeepLoading] = useState(false)

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callback') || '/portal/dashboard'

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
    try {
      //   const { data: res } = await login(data)
      //   Cookies.set('portalAccessToken', res.accessToken)
      //   Cookies.set('portalUserId', res.user._id)

      router.push(callbackUrl)
      setKeepLoading(true)
    } catch (error: any) {
      addToast({
        title:
          error?.data?.error ||
          error?.data?.message ||
          error?.message ||
          'Something went wrong. Please try again later.',
        color: 'danger',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
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
  )
}
