import axiosInstance from '@/api-client/request-adapter'

export const getPortalReferralProfile = () =>
  axiosInstance.get('portal/referral-partners/me')

export const updatePortalReferralProfile = (data: any) =>
  axiosInstance.patch('portal/referral-partners/me', data)

export const getPortalReferrals = () =>
  axiosInstance.get('portal/referral-partners/referrals')

export const getPortalReferredUserDetails = (userId: string) =>
  axiosInstance.get(`portal/referral-partners/referrals/${userId}`)

export const getPortalReferredUserOrders = (userId: string) =>
  axiosInstance.get(`portal/referral-partners/referrals/${userId}/orders`)

export const getPortalReferredUserOrder = (userId: string, orderId: string) =>
  axiosInstance.get(
    `portal/referral-partners/referrals/${userId}/orders/${orderId}`,
  )
