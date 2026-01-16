'use client'

import { login } from '@/api-client/portal/requests/auth.requests'
import InputField from '@/components/elements/input-field'
import { addToast, Button } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LuLogIn } from 'react-icons/lu'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginForm() {
  const [keepLoading, setKeepLoading] = useState(false)

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callback') || '/portal/dashboard'

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
      Cookies.set('portalAccessToken', res.accessToken)
      Cookies.set('portalUserId', res.user._id, {
        expires: 60,
      })

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
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
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
            href="/portal/forgot-password"
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
        <LuLogIn className="mr-2 h-4 w-4" />
        Sign In to Portal
      </Button>

      <div className="pt-2 text-center text-sm text-muted-foreground">
        New to PharmaHub?{' '}
        <Link
          href="/portal/register"
          className="font-bold text-primary hover:text-primary/80 transition-colors"
        >
          Create an account
        </Link>
      </div>
    </form>
  )
}
