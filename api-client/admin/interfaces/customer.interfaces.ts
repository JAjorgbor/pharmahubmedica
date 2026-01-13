import { IReferralPartner } from '@/api-client/admin/interfaces/referral.interfaces'
import { string } from 'zod'

export interface ICustomer {
  _id: string
  id?: string
  firstName: string
  lastName?: string
  email: string
  phoneNumber?: string
  gender?: 'male' | 'female'
  status: 'pending' | 'active' | 'inactive' | 'waitlist'
  isReferralPartner: boolean
  referredBy?: IReferralPartner
  totalSpent?: number
  createdAt: string
  updatedAt: string
}
