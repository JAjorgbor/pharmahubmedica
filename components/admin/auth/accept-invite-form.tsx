'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { addToast, Button } from '@heroui/react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Cookies from 'js-cookie'
import InputField from '@/components/elements/input-field'
import { acceptInvite } from '@/api-client/admin/requests/admin.team.requests'
import { useState } from 'react'
import getCookieDomain from '@/utils/get-cookie-domain'

const acceptInviteSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type AcceptInviteFormValues = z.infer<typeof acceptInviteSchema>

export default function AcceptInviteForm() {
  const [keepLoading, setKeepLoading] = useState(false)
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()

  const token = params.token as string
  const firstName = searchParams.get('firstName') || 'Team Member'

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AcceptInviteFormValues>({
    resolver: zodResolver(acceptInviteSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: AcceptInviteFormValues) => {
    try {
      const { data: res } = await acceptInvite(token, {
        password: data.password,
      })

      Cookies.set('adminAccessToken', res.accessToken, {
        expires: 60,
        path: '/',
        domain: getCookieDomain(),
      })
      Cookies.set('adminUserId', res.user._id, {
        expires: 60,
        path: '/',
        domain: getCookieDomain(),
      })

      addToast({
        title: 'Invite accepted successfully! Welcome aboard.',
        color: 'success',
      })

      router.push('/admin/dashboard')
      setKeepLoading(true)
    } catch (error: any) {
      addToast({
        title:
          error?.data?.message ||
          error?.message ||
          'Failed to accept invite. Please try again or contact support.',
        color: 'danger',
      })
    }
  }

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          Welcome, {firstName}!
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Create your password to complete your registration and join the team.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          type="password"
          label="Create Password"
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
          className="w-full text-base font-semibold"
          isLoading={isSubmitting || keepLoading}
        >
          Create Password & Join
        </Button>
      </form>
    </div>
  )
}
