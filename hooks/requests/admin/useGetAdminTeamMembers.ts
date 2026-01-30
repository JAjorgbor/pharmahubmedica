'use client'
import { IAdminUser } from '@/api-client/admin/interfaces/admin.user.interfaces'
import { getTeamMembers } from '@/api-client/admin/requests/admin.team.requests'
import useSWR from 'swr'

export default function useGetAdminTeamMembers() {
  const fetcher = async () => {
    const { data } = await getTeamMembers()
    return data
  }

  const { data, error, isLoading, mutate } = useSWR<IAdminUser[]>(
    'admin/team',
    fetcher
  )

  return {
    teamMembers: data,
    teamMembersError: error,
    teamMembersLoading: isLoading,
    mutateTeamMembers: mutate,
  }
}
