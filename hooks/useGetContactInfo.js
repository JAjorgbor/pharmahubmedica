import useSWR from 'swr'
import { getContact } from '@/utils/requests'

export default function () {
  const fetcher = async () => {
    const contact = await getContact()
    return contact
  }
  const {data, error, isLoading} = useSWR('api/contact', fetcher)

  return {
    contactInfo:data,
    contactInfoError: error,
    contactInfoLoading: isLoading
  }
}
