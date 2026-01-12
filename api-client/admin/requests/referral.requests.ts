import axiosInstance from '@/api-client/admin/request-adapter'
import { IReferralPartner } from '../interfaces/referral.interfaces'

export const getReferralPartners = (params?: any) =>
  axiosInstance.get(`admin/referral-partners`, { params })

export const getReferralPartner = (id: string) =>
  axiosInstance.get(`admin/referral-partners/${id}`)

export const addReferralPartner = (data: {
  user: string
  commissionRate: number
  profession: string
}) => axiosInstance.post(`admin/referral-partners`, data)

export const updateReferralPartner = (
  id: string,
  data: {
    commissionRate?: number
    profession?: string
  }
) => axiosInstance.patch(`admin/referral-partners/${id}`, data)

export const toggleReferralPartnerStatus = (id: string) =>
  axiosInstance.patch(`admin/referral-partners/toggle-status/${id}`)
