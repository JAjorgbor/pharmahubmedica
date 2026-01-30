'use client'
import { getPortalUser } from '@/api-client/portal/requests/portal.user.requests'
import { IPortalUser } from '@/api-client/interfaces/portal.user.interfaces'
import Cookies from 'js-cookie'
import useSWR from 'swr'

export default function useGetPortalUser() {
  const accessToken = Cookies.get('portalAccessToken')
  const fetcher = async () => {
    const { data } = await getPortalUser()
    return data
  }

  const { data, error, isLoading, mutate } = useSWR<IPortalUser>(
    accessToken ? `portal/user/me` : null,
    fetcher,
  )
  return {
    portalUser: data,
    portalUserError: error,
    portalUserLoading: isLoading,
    mutatePortalUser: mutate,
  }
}
