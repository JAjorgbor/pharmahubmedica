import { IAccountDetails, IBank } from '@/api-client/interfaces/bank.interfaces'
import {
  getBanks,
  verifyAccountDetails,
} from '@/api-client/portal/requests/bank.requests'
import useSWR from 'swr'

export const useGetBanks = () => {
  const fetcher = async () => {
    const { data } = await getBanks()
    return data
  }
  const { data, isLoading, error, mutate } = useSWR<IBank[]>('banks', fetcher)

  return {
    banks: data,
    banksLoading: isLoading,
    banksError: error,
    mutateBanks: mutate,
  }
}

export const useVerifyAccountDetails = ({
  account_number,
  bank_code,
}: {
  account_number: string | undefined
  bank_code: string | undefined
}) => {
  const fetcher = async () => {
    const { data } = await verifyAccountDetails({ account_number, bank_code })
    if (!data?.status) {
      throw new Error(data?.message)
    }
    return data
  }
  const { data, isLoading, error, mutate, isValidating } =
    useSWR<IAccountDetails>(
      account_number && bank_code
        ? ['banks/verify-account-details', account_number, bank_code]
        : null,
      fetcher,
    )

  return {
    accountDetails: data,
    accountDetailsLoading: isLoading,
    accountDetailsError: error,
    accountDetailsRevalidating: isValidating,
    mutateAccountDetails: mutate,
  }
}
