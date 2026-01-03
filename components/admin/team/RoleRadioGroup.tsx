'use client'

import React from 'react'
import { RadioGroup, Radio, cn } from '@heroui/react'
import { Control, useController } from 'react-hook-form'
import { capitalCase } from 'change-case'
import { adminUserRolesPermissions } from '@/library/config'

interface RoleRadioGroupProps {
  control: Control<any>
  name: string
  label?: string
}

const CustomRadio = (props: any) => {
  const { children, description, ...otherProps } = props

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
          'flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent',
          'data-[selected=true]:border-primary'
        ),
      }}
    >
      <div className="flex flex-col gap-1">
        <span className="text-medium font-semibold capitalize">{children}</span>
        <span className="text-tiny text-foreground-400">{description}</span>
      </div>
    </Radio>
  )
}

export default function RoleRadioGroup({
  control,
  name,
  label = 'Select Role',
}: RoleRadioGroupProps) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: 'Please select a role' },
  })

  return (
    <div className="space-y-2">
      <RadioGroup
        label={label}
        value={value}
        onValueChange={onChange}
        errorMessage={error?.message}
        isInvalid={!!error}
        className="max-w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(adminUserRolesPermissions).map(
            ([role, permissions]) => (
              <CustomRadio
                key={role}
                value={role}
                description={`Permissions: ${permissions.length}`}
              >
                {role.replace(/([A-Z])/g, ' $1').trim()}
              </CustomRadio>
            )
          )}
        </div>
      </RadioGroup>
      {value && (
        <div className="p-3 bg-foreground-50 rounded-lg border border-foreground-200">
          <p className="text-xs font-semibold text-foreground-500 mb-2 uppercase tracking-wider">
            Assigned Permissions ({value}):
          </p>
          <div className="flex flex-wrap gap-1.5">
            {adminUserRolesPermissions[
              value as keyof typeof adminUserRolesPermissions
            ].map((perm) => (
              <span
                key={perm}
                className="text-[10px] bg-white border border-foreground-200 px-2 py-0.5 rounded-full text-foreground-600"
              >
                {capitalCase(perm)}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
