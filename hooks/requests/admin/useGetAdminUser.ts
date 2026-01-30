'use client'
import { IAdminUser } from '@/api-client/admin/interfaces/admin.user.interfaces'
import { getAdminUser } from '@/api-client/admin/requests/admin.user.requests'
import Cookies from 'js-cookie'
import useSWR from 'swr'

export default function useGetAdminUser() {
  const userId = Cookies.get('adminUserId')
  const accessToken = Cookies.get('adminAccessToken')
  const fetcher = async () => {
    const { data } = await getAdminUser(userId)
    return data
  }

  const { data, error, isLoading, mutate } = useSWR<IAdminUser>(
    accessToken ? `admin/user/${userId}` : null,
    fetcher
  )
  return {
    adminUser: data,
    adminUserError: error,
    adminUserLoading: isLoading,
    mutateAdminUser: mutate,
  }
}
