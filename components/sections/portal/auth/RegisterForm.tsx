'use client'

import InputField from '@/components/elements/input-field'
import { addToast, Button } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phoneNumber: z.string().min(10, 'Phone number is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterForm() {
  const [keepLoading, setKeepLoading] = useState(false)

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callback') || '/portal/dashboard'

  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
    },
  })

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      //   const { data: res } = await register(data)
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
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-2">
        <InputField
          type="text"
          label="First Name"
          placeholder="First Name"
          controllerProps={{
            name: 'firstName',
            control,
          }}
          isRequired
        />

        <InputField
          type="text"
          label="Last Name"
          placeholder="Last Name"
          controllerProps={{
            name: 'lastName',
            control,
          }}
          isRequired
        />
      </div>

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

      <InputField
        type="phoneNumber"
        label="Phone Number"
        placeholder="+234 800 000 0000"
        controllerProps={{
          name: 'phoneNumber',
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
      </div>

      <Button
        type="submit"
        color="primary"
        className="w-full py-6 text-base font-semibold"
        isLoading={isSubmitting || keepLoading}
      >
        Register
      </Button>
      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link
          href="/portal/login"
          className="font-semibold text-primary hover:underline"
        >
          Sign In
        </Link>
      </div>
    </form>
  )
}
