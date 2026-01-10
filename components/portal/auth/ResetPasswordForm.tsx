'use client'

import InputField from '@/components/elements/input-field'
import { addToast, Button } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LuArrowLeft } from 'react-icons/lu'
import { MdOutlineLockReset } from 'react-icons/md'
import { z } from 'zod'

const resetPasswordSchema = z.object({
  email: z.email('Invalid email address'),
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
      email: '',
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
        type="email"
        label="Email Address"
        placeholder="example@email.com"
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
        isLoading={isSubmitting || keepLoading}
      >
        Send Reset Link
      </Button>
      <div className="text-center">
        <Link
          href="/portal"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <LuArrowLeft className="mr-2 h-4 w-4" />
          Back to login
        </Link>
      </div>
    </form>
  )
}
