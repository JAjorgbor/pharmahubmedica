'use client'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { addToast, Button } from '@heroui/react'
import DrawerWrapper from '@/components/elements/drawer-wrapper'
import InputField from '@/components/elements/input-field'
import RoleRadioGroup from './RoleRadioGroup'
import { updateTeamMember } from '@/api-client/admin/requests/admin.team.requests'
import { IAdminUser } from '@/api-client/admin/interfaces/admin.user.interfaces'
import useGetAdminUser from '@/hooks/requests/admin/useGetAdminUser'

const updateSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
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
  status: z.enum(['active', 'inactive', 'pending']),
})

type UpdateFormValues = z.infer<typeof updateSchema>

interface UpdateTeamMemberDrawerProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  member: IAdminUser | null
  onSuccess: () => void
}

export default function UpdateTeamMemberDrawer({
  isOpen,
  setIsOpen,
  member,
  onSuccess,
}: UpdateTeamMemberDrawerProps) {
  const { adminUser } = useGetAdminUser()
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<UpdateFormValues>({
    resolver: zodResolver(updateSchema),
  })

  useEffect(() => {
    if (member) {
      reset({
        firstName: member.firstName,
        lastName: member.lastName,
        phoneNumber: member.phoneNumber || '',
        gender: member.gender as 'Male' | 'Female',
        role: member.role as UpdateFormValues['role'],
        status: member.status as 'active' | 'inactive' | 'pending',
      })
    }
  }, [member, reset])

  const onSubmit = async (data: UpdateFormValues) => {
    if (!member) return
    try {
      await updateTeamMember(member._id, data)
      addToast({
        title: 'Team Member Updated',
        description: `Successfully updated ${data.firstName} ${data.lastName}`,
        color: 'success',
      })
      onSuccess()
      setIsOpen(false)
    } catch (error: any) {
      addToast({
        title: 'Error',
        description: error?.data?.message || 'Failed to update team member',
        color: 'danger',
      })
    }
  }

  return (
    <DrawerWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Update Team Member"
      size="xl"
      footer={
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="flat" onPress={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            form="update-team-member-form"
            isLoading={isSubmitting}
          >
            Update Member
          </Button>
        </div>
      }
    >
      <form
        id="update-team-member-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 py-2"
      >
        <div className="grid grid-cols-2 gap-4">
          <InputField
            type="text"
            label="First Name"
            placeholder="John"
            controllerProps={{ name: 'firstName', control }}
            isRequired
            isName
          />
          <InputField
            type="text"
            label="Last Name"
            placeholder="Doe"
            controllerProps={{ name: 'lastName', control }}
            isRequired
            isName
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            type="phoneNumber"
            label="Phone Number"
            placeholder="09012345678"
            controllerProps={{ name: 'phoneNumber', control }}
            isRequired
          />
          <InputField
            label="Status"
            type="select"
            options={[
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
              { label: 'Pending', value: 'pending' },
            ]}
            controllerProps={{ name: 'status', control }}
            isRequired
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
