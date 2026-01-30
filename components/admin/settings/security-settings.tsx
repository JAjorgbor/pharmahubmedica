'use client'
import { updateAdminUserPassword } from '@/api-client/admin/requests/admin.user.requests'
import InputField from '@/components/elements/input-field'
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, type FC } from 'react'
import { useForm } from 'react-hook-form'
import { LuLock } from 'react-icons/lu'
import z from 'zod'

interface SecuritySettingsProps {}

const securitySchema = z
  .object({
    currentPassword: z.string({ error: 'Current Password is required' }),
    newPassword: z.string({ error: 'New password is required' }),
    confirmNewPassword: z.string({
      error: 'New password confirmation is required',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmNewPassword) {
      ctx.addIssue({
        code: 'custom',
        message: "Passwords don't match",
        path: ['newPassword'],
      })

      ctx.addIssue({
        code: 'custom',
        message: "Passwords don't match",
        path: ['confirmNewPassword'],
      })
    }
  })
type SecurityFormFields = z.infer<typeof securitySchema>

const SecuritySettings: FC<SecuritySettingsProps> = ({}) => {
  const formMethods = useForm<SecurityFormFields>({
    resolver: zodResolver(securitySchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const handleSubmit = async (data: SecurityFormFields) => {
    try {
      await updateAdminUserPassword(data)
      addToast({
        title: 'Password updated successfully',
        color: 'success',
        severity: 'success',
      })
      formMethods.reset({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      })
    } catch (error) {
      addToast({
        title:
          error?.data?.message ||
          error?.message ||
          'Something went wrong. Please try again later',
        color: 'danger',
        severity: 'danger',
      })
    }
  }

  const newPassword = formMethods.watch('newPassword')
  const confirmNewPassword = formMethods.watch('confirmNewPassword')
  const isNewPasswordDirty = formMethods.formState.dirtyFields.newPassword
  const isConfirmNewPasswordDirty =
    formMethods.formState.dirtyFields.confirmNewPassword
  useEffect(() => {
    // Revalidate both fields whenever either changes
    if (isNewPasswordDirty || isConfirmNewPasswordDirty) {
      void formMethods.trigger(['confirmNewPassword', 'newPassword'])
    }
  }, [
    newPassword,
    confirmNewPassword,
    isNewPasswordDirty,
    isConfirmNewPasswordDirty,
  ])

  return (
    <>
      <Card>
        <CardHeader className="pt-6 px-6 mb-0">
          <div>
            <h2 className="text-primary text-md font-semibold">
              Change Password
            </h2>
            <p className="text-small text-default-500">
              Update your account password
            </p>
          </div>
        </CardHeader>
        <CardBody className="space-y-4 px-6">
          <form
            id="security-settings-form"
            onSubmit={formMethods.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <InputField
              label="Current Password"
              type="password"
              placeholder="Enter your current password"
              controllerProps={{
                control: formMethods.control,
                name: 'currentPassword',
              }}
              color="primary"
              startContent={<LuLock className="h-5 w-5 text-gray-400" />}
            />
            <InputField
              label="New Password"
              type="password"
              placeholder="Enter your new password"
              controllerProps={{
                control: formMethods.control,
                name: 'newPassword',
              }}
              color="primary"
              startContent={<LuLock className="h-5 w-5 text-gray-400" />}
            />
            <InputField
              label="Confirm Password"
              type="password"
              placeholder="Confirm your new password"
              controllerProps={{
                control: formMethods.control,
                name: 'confirmNewPassword',
              }}
              color="primary"
              startContent={<LuLock className="h-5 w-5 text-gray-400" />}
            />
          </form>
        </CardBody>
        <CardFooter className="px-6 pb-6">
          <Button
            type="submit"
            form="security-settings-form"
            size="md"
            color="primary"
            isLoading={formMethods.formState.isSubmitting}
          >
            Update Password
          </Button>
        </CardFooter>
      </Card>
      <Card className="mt-6 p-6">
        <CardHeader className="py-0 mb-0">
          <div>
            <p className="text-md font-semibold">Security Recommendations</p>
          </div>
        </CardHeader>
        <CardBody className="pb-0">
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Use a strong password with at least 8 characters</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>
                Include uppercase, lowercase, numbers, and special characters
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Change your password regularly</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Never share your password with anyone</span>
            </li>
          </ul>
        </CardBody>
      </Card>
    </>
  )
}
export default SecuritySettings
