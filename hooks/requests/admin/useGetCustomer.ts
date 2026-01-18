'use client'
import { ICustomer } from '@/api-client/admin/interfaces/customer.interfaces'
import { getCustomer } from '@/api-client/admin/requests/customer.requests'
import useSWR from 'swr'

export default function useGetCustomer(userId: string) {
  const fetcher = async () => {
    const {
      data: { customer },
    } = await getCustomer(userId)
    return customer
  }

  const { data, error, isLoading, mutate } = useSWR<ICustomer>(
    userId ? ['admin/customers', userId] : null,
    fetcher,
  )

  return {
    customer: data,
    customerError: error,
    customerLoading: isLoading,
    mutateCustomer: mutate,
  }
}
