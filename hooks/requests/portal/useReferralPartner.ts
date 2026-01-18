import { IOrder } from '@/api-client/interfaces/order.interfaces'
import {
  getPortalReferralProfile,
  getPortalReferrals,
  getPortalReferredUserDetails,
  getPortalReferredUserOrder,
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

export function useGetPortalReferredUserOrder(userId: string, orderId: string) {
  const { data, error, isLoading, mutate } = useSWR<IOrder>(
    userId
      ? `portal/referral-partners/referrals/${userId}/order?orderId=${orderId}`
      : null,
    async () => {
      const { data } = await getPortalReferredUserOrder(userId, orderId)
      return data.order
    },
  )
  return {
    order: data,
    orderLoading: isLoading,
    orderError: error,
    mutateOrder: mutate,
  }
}
