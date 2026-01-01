'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { addToast, Button } from '@heroui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Cookies from 'js-cookie'
import InputField from '@/components/elements/input-field'
import { login } from '@/api-client/admin/requests/auth.requests'
import { useState } from 'react'

const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function AdminLoginPage() {
  const [keepLoading, setKeepLoading] = useState(false)

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
      Cookies.set('adminAccessToken', res.accessToken)
      Cookies.set('adminUserId', res.user._id)

      router.push('/admin/dashboard')
      setKeepLoading(true)
    } catch (error) {
      addToast({
        title:
          error?.status === 500
            ? error?.statusText
            : error?.data?.message ||
              error?.message ||
              'Something went wrong. Please try again later.',
        color: 'danger',
        severity: 'danger',
      })
    }
  }

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          Admin Login
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your credentials to access the dashboard
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
    </div>
  )
}
