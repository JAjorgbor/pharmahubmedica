import {
  getPortalReferralProfile,
  getPortalReferrals,
  getPortalReferredUserDetails,
  getPortalReferredUserOrders,
} from '@/api-client/portal/requests/referral-partner.requests'
import useSWR from 'swr'

export function useGetPortalReferralProfile() {
  const { data, error, isLoading, mutate } = useSWR(
    'portal/referral-partners/me',
    async () => {
      const { data } = await getPortalReferralProfile()
      return data.partner
    },
  )

  return {
    profile: data,
    isLoading,
    error,
    mutate,
  }
}

export function useGetPortalReferrals() {
  const { data, error, isLoading, mutate } = useSWR(
    'portal/referral-partners/referrals',
    async () => {
      const { data } = await getPortalReferrals()
      return data.referrals
    },
  )

  return {
    referrals: data,
    isLoading,
    error,
    mutate,
  }
}

export function useGetPortalReferredUserDetails(userId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `portal/referral-partners/referrals/${userId}` : null,
    async () => {
      const { data } = await getPortalReferredUserDetails(userId)
      return data.user
    },
  )

  return {
    user: data,
    isLoading,
    error,
    mutate,
  }
}

export function useGetPortalReferredUserOrders(userId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `portal/referral-partners/referrals/${userId}/orders` : null,
    async () => {
      const { data } = await getPortalReferredUserOrders(userId)
      return data.orders
    },
  )

  return {
    orders: data,
    isLoading,
    error,
    mutate,
  }
}
