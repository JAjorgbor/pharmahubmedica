import useSWR from 'swr'
import { getTeamEmails } from '@/utils/requests'

export default function () {
  const fetcher = async () => {
    const data = await getTeamEmails()
    return data?.emails
  }
  const { data, error, isLoading, mutate } = useSWR('api/team-emails', fetcher)
  return {
    teamEmails: data,
    teamEmailsError: error,
    teamEmailsLoading: isLoading,
    mutateTeamEmails: mutate,
  }
}
