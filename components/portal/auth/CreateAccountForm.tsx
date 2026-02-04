'use client'

import { createAccount } from '@/api-client/portal/requests/auth.requests'
import InputField from '@/components/elements/input-field'
import { addToast, Button, Card, CardBody, Input } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
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

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const { data: res } = await createAccount(data)
      Cookies.set('portalAccessToken', res.accessToken)
      Cookies.set('portalUserId', res.user._id, { expires: 60 })
      localStorage.removeItem('referralCode')

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

  useEffect(() => {
    const referralCode = localStorage.getItem('referralCode')
    if (referralCode) {
      setValue('referralCode', referralCode)
    }
  }, [])

  return (
    <Card className="max-w-md mx-auto">
      <CardBody className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-3">
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
              className="md:col-span-2"
              controllerProps={{
                name: 'email',
                control,
              }}
              isRequired
            />

            <InputField
              type="phoneNumber"
              label="WhatsApp Number"
              placeholder="+234 800 000 0000"
              className="md:col-span-2"
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

            <InputField
              label="Referral Code (Optional)"
              type="text"
              noWhiteSpace
              className="md:col-span-2"
              controllerProps={{ name: 'referralCode', control }}
              onChange={(value) =>
                setValue('referralCode', value.toUpperCase())
              }
              maxLength={8}
              placeholder="Enter referral code"
            />
          </div>
          <Button
            type="submit"
            color="primary"
            className="w-full text-base"
            isLoading={isSubmitting || keepLoading}
          >
            Create Account
          </Button>
          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link
              href={`/portal${callbackUrl ? `?callback=${callbackUrl}` : ''}`}
              className="font-semibold text-primary hover:underline"
            >
              Sign In
            </Link>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}
