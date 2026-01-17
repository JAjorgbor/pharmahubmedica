'use client'

import { resetPassword } from '@/api-client/portal/requests/auth.requests'
import InputField from '@/components/elements/input-field'
import { addToast, Button, Card, CardBody } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LuArrowLeft, LuMail } from 'react-icons/lu'
import { z } from 'zod'

const resetPasswordSchema = z.object({
  email: z.email('Invalid email address'),
})

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export default function ForgotPasswordForm() {
  const [isSuccess, setIsSuccess] = useState(false)

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
      await resetPassword(data)
      setIsSuccess(true)
    } catch (error: any) {
      addToast({
        title:
          error?.data?.error ||
          error?.data?.message ||
          error?.message ||
          'Failed to send reset email. Please try again.',
        color: 'danger',
      })
    }
  }

  return (
    <Card>
      <CardBody className="p-6">
        {isSuccess ? (
          <div className="space-y-6 flex flex-col items-center text-center">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-4">
                <LuMail className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">
                Check your email
              </h2>
              <p className="text-sm text-foreground-500">
                We've sent a password reset link to your email address. Please
                click the link in the email to reset your password.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 w-full text-left">
              <p className="text-xs text-foreground-500">
                <span className="font-medium text-foreground">Tip:</span> The
                link expires after a short time. If you don't see the email,
                check your spam folder.
              </p>
            </div>
            <div className="space-y-3 w-full">
              <Button
                href="/login"
                className="w-full bg-primary hover:bg-primary/90 text-white font-semiboldh-11"
              >
                Back to login
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              className="w-full text-base font-semibold"
              isLoading={isSubmitting}
            >
              Send Reset Link
            </Button>
            <div className="text-center">
              <Link
                href="/portal"
                className="inline-flex items-center text-sm font-medium text-foreground-500 hover:text-primary transition-colors"
              >
                <LuArrowLeft className="mr-2 h-4 w-4" />
                Back to login
              </Link>
            </div>
          </form>
        )}
      </CardBody>
    </Card>
  )
}
