'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { addToast, Button } from '@heroui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Cookies from 'js-cookie'
import InputField from '@/components/elements/input-field'
import { login } from '@/api-client/admin/requests/auth.requests'
import { useState } from 'react'
import Link from 'next/link'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginForm() {
  const [keepLoading, setKeepLoading] = useState(false)

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callback') || '/admin/dashboard'

  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const { data: res } = await login(data)
      Cookies.set('adminAccessToken', res.accessToken, { expires: 60 })
      Cookies.set('adminUserId', res.user._id, { expires: 60 })

      router.push(callbackUrl)
      setKeepLoading(true)
    } catch (error: any) {
      addToast({
        title:
          error?.data?.message ||
          error?.message ||
          'Something went wrong. Please try again later.',
        color: 'danger',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

      <div>
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
        <div className="flex justify-end mt-2">
          <Link
            href="/admin/forgot-password"
            className="text-sm font-medium text-primary hover:text-blue-700 transition-colors"
          >
            Forgot your password?
          </Link>
        </div>
      </div>

      <Button
        type="submit"
        color="primary"
        className="w-full py-6 text-base font-semibold"
        isLoading={isSubmitting || keepLoading}
      >
        Sign in
      </Button>
    </form>
  )
}
