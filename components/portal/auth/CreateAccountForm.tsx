'use client'

import { createAccount } from '@/api-client/portal/requests/auth.requests'
import InputField from '@/components/elements/input-field'
import { addToast, Button, Input } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Cookies from 'js-cookie'

const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phoneNumber: z.string().min(10, 'Phone number is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  referralCode: z
    .string()
    .regex(/^[A-Z0-9]*$/, 'Only alphanumeric characters are allowed')
    .optional(),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export default function CreateAccountForm() {
  const [keepLoading, setKeepLoading] = useState(false)

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callback') || '/portal/dashboard'

  const router = useRouter()
  const {
    control,
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      referralCode: '',
    },
  })

  const referralCode = watch('referralCode')

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const { data: res } = await createAccount(data)
      Cookies.set('portalAccessToken', res.accessToken)
      Cookies.set('portalUserId', res.user._id, { expires: 60 })
      console.log(res)

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
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-6">
      <div className="grid lg:grid-cols-2 gap-4">
        <InputField
          type="text"
          label="First Name"
          isName
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
          isName
          controllerProps={{
            name: 'lastName',
            control,
          }}
          isRequired
        />

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

        <InputField
          type="password"
          label="Password"
          placeholder="••••••••"
          className="md:col-span-2"
          controllerProps={{
            name: 'password',
            control,
          }}
          isRequired
        />

        <div className="space-y-1 md:col-span-2">
          <p>
            <span className="text-primary-600 font-light relative text-sm text-nevada font-oxygen">
              Referral Code
            </span>
          </p>
          <Input
            color="primary"
            variant="bordered"
            placeholder="ENTER REFERRAL CODE"
            value={referralCode}
            isInvalid={!!errors.referralCode}
            errorMessage={errors.referralCode?.message}
            {...register('referralCode')}
            onChange={(e) => {
              const value = e.target.value
                .toUpperCase()
                .replace(/[^A-Z0-9]/g, '')

              setValue('referralCode', value, { shouldValidate: true })
            }}
          />
        </div>
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
          href="/portal"
          className="font-semibold text-primary hover:underline"
        >
          Sign In
        </Link>
      </div>
    </form>
  )
}
