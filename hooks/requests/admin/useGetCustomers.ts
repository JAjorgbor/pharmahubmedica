'use client'
import { ICustomer } from '@/api-client/admin/interfaces/customer.interfaces'
import { getCustomers } from '@/api-client/admin/requests/customer.requests'
import useSWR from 'swr'

export default function useGetCustomers(params?: any) {
  const fetcher = async () => {
    const {
      data: { customers },
    } = await getCustomers(params)
    return customers.reverse()
  }

  const { data, error, isLoading, mutate } = useSWR<ICustomer[]>(
    ['admin/customers', params],
    fetcher
  )

  return {
    customers: data,
    customersError: error,
    customersLoading: isLoading,
    mutateCustomers: mutate,
  }
}
