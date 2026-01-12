'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { addToast, Button } from '@heroui/react'
import DrawerWrapper from '@/components/elements/drawer-wrapper'
import InputField from '@/components/elements/input-field'
import RoleRadioGroup from './RoleRadioGroup'
import { inviteTeamMember } from '@/api-client/admin/requests/admin.team.requests'
import useGetAdminUser from '@/hooks/requests/admin/useGetAdminUser'

const inviteSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Invalid phone number'),
  gender: z.enum(['Male', 'Female']),
  role: z.enum([
    'administrator',
    'operations',
    'storeManager',
    'marketingAndSales',
    'accountant',
    'driver',
  ]),
})

type InviteFormValues = z.infer<typeof inviteSchema>

interface InviteTeamMemberDrawerProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  onSuccess: () => void
}

export default function InviteTeamMemberDrawer({
  isOpen,
  setIsOpen,
  onSuccess,
}: InviteTeamMemberDrawerProps) {
  const { adminUser } = useGetAdminUser()
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      gender: 'Male',
      role: 'operations' as InviteFormValues['role'],
    },
  })

  const onSubmit = async (data: InviteFormValues) => {
    try {
      await inviteTeamMember(data)
      addToast({
        title: 'Invitation Sent',
        description: `Successfully invited ${data.firstName} ${data.lastName}`,
        color: 'success',
      })
      reset()
      onSuccess()
      setIsOpen(false)
    } catch (error: any) {
      addToast({
        title: 'Error',
        description: error?.data?.message || 'Failed to send invitation',
        color: 'danger',
      })
    }
  }

  return (
    <DrawerWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Invite Team Member"
      size="xl"
      footer={
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="flat" onPress={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            form="invite-team-member-modal"
            isLoading={isSubmitting}
          >
            Send Invitation
          </Button>
        </div>
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="invite-team-member-modal"
        className="space-y-6 py-2"
      >
        <div className="grid grid-cols-2 gap-4">
          <InputField
            type="text"
            label="First Name"
            placeholder="John"
            controllerProps={{ name: 'firstName', control }}
            isName
            isRequired
          />
          <InputField
            type="text"
            label="Last Name"
            placeholder="Doe"
            isName
            controllerProps={{ name: 'lastName', control }}
            isRequired
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Email Address"
            placeholder="john.doe@example.com"
            type="email"
            controllerProps={{ name: 'email', control }}
            isRequired
          />
          <InputField
            label="Phone Number"
            placeholder="09012345678"
            controllerProps={{ name: 'phoneNumber', control }}
            isRequired
            type="phoneNumber"
          />
        </div>

        <InputField
          label="Gender"
          type="select"
          options={[
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
          ]}
          controllerProps={{ name: 'gender', control }}
          isRequired
        />

        <RoleRadioGroup
          control={control}
          name="role"
          currentUserRole={adminUser?.role}
        />
      </form>
    </DrawerWrapper>
  )
}
