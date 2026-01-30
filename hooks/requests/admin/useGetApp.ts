'use client'
import { IApp } from '@/api-client/interfaces/app.interfaces'
import { getApp } from '@/api-client/admin/requests/app.requests'
import useSWR from 'swr'

export default function useGetApp() {
  const fetcher = async () => {
    const { data } = await getApp()
    return data.app
  }

  const { data, error, isLoading, mutate } = useSWR<IApp>('/app', fetcher)

  return {
    app: data,
    appError: error,
    appLoading: isLoading,
    mutateApp: mutate,
  }
}
