import { IAccountDetails, IBank } from '@/api-client/interfaces/bank.interfaces'
import {
  getBanks,
  verifyAccountDetails,
} from '@/api-client/admin/requests/admin.bank.requests'
import useSWR from 'swr'

export function uniqueBanksByCode(banks: IBank[]) {
  const map = new Map<string, IBank>()

  for (const b of banks) {
    if (!b?.code) continue

    const key = (b.country ? `${b.country.toLowerCase()}:` : '') + b.code

    // Pick the "best" entry if duplicates exist:
    // Prefer active + not deleted; if tie, prefer latest updatedAt
    const existing = map.get(key)
    if (!existing) {
      map.set(key, b)
      continue
    }

    const score = (x: IBank) =>
      (x.active ? 10 : 0) +
      (x.is_deleted ? -10 : 0) +
      (x.type === 'nuban' ? 2 : 0)

    const exScore = score(existing)
    const bScore = score(b)

    if (bScore > exScore) {
      map.set(key, b)
      continue
    }

    if (bScore === exScore) {
      const exTime = existing.updatedAt ? Date.parse(existing.updatedAt) : 0
      const bTime = b.updatedAt ? Date.parse(b.updatedAt) : 0
      if (bTime > exTime) map.set(key, b)
    }
  }

  // Return sorted (optional)
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name))
}

export const useGetBanks = () => {
  const fetcher = async () => {
    const {
      data: { banks },
    } = await getBanks()
    return uniqueBanksByCode(banks)
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
  accountNumber,
  bankCode,
}: {
  accountNumber: string | undefined
  bankCode: string | undefined
}) => {
  const fetcher = async () => {
    const {
      data: { bankAccount },
    } = await verifyAccountDetails({ accountNumber, bankCode })
    if (!bankAccount?.status) {
      throw new Error(bankAccount?.message)
    }
    return bankAccount.data
  }
  const { data, isLoading, error, mutate, isValidating } =
    useSWR<IAccountDetails>(
      accountNumber && bankCode
        ? ['admin/banks/validate-account', accountNumber, bankCode]
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
