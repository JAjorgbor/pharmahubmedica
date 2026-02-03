'use client'

import React, { useMemo } from 'react'
import { Autocomplete, AutocompleteItem, Skeleton } from '@heroui/react'
import useGetCustomers from '@/hooks/requests/admin/useGetCustomers'
import { ICustomer } from '@/api-client/admin/interfaces/customer.interfaces'

interface UserSelectionSectionProps {
  selectedUserId: string
  onSelect: (userId: string) => void
}

const UserSelectionSection = ({
  selectedUserId,
  onSelect,
}: UserSelectionSectionProps) => {
  const { customers, customersLoading } = useGetCustomers()

  const userOptions = useMemo(() => {
    return (
      customers?.map((customer) => ({
        label: `${customer.firstName} ${customer.lastName || ''} (${
          customer.email
        })`,
        value: customer._id,
        email: customer.email,
        name: `${customer.firstName} ${customer.lastName || ''}`,
      })) || []
    )
  }, [customers])

  if (customersLoading) {
    return (
      <div className="w-full space-y-2">
        <Skeleton className="h-4 w-1/4 rounded-lg" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    )
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">1. Select Customer</h3>
      <Autocomplete
        label="Search Customer"
        placeholder="Type to search users..."
        defaultItems={userOptions}
        selectedKey={selectedUserId}
        onSelectionChange={(key) => onSelect(key as string)}
        className="max-w-xl"
        allowsCustomValue={false}
      >
        {(item) => (
          <AutocompleteItem key={item.value} textValue={item.label}>
            <div className="flex flex-col">
              <span className="font-medium">{item.name}</span>
              <span className="text-tiny text-default-500">{item.email}</span>
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  )
}

export default UserSelectionSection
