'use client'
import { IApp } from '@/api-client/interfaces/app.interfaces'
import { apiFetch } from '@/api-client/fetch-client'
import useSWR from 'swr'

export default function useGetApp() {
  const fetcher = async () => {
    const { data } = await apiFetch('/app')
    return data?.app
  }

  const { data, error, isLoading, mutate } = useSWR<IApp>('/app', fetcher)

  return {
    app: data,
    appError: error,
    appLoading: isLoading,
    mutateApp: mutate,
  }
}
