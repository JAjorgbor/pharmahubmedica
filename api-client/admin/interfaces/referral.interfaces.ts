import { IAdminUser } from './admin.user.interfaces'
import { ICustomer } from './customer.interfaces'

export interface IReferralPartner {
  _id: string
  user: ICustomer // Populated portal user
  referralCode: string
  status: 'active' | 'inactive'
  profession:
    | 'doctor'
    | 'nurse'
    | 'pharmacist'
    | 'chemist'
    | 'lab technician'
    | 'other'
  commission: {
    rate: number
    rateType: 'percentage' | 'fixed'
  }
  // Virtual fields
  commissionTotal?: number
  pendingCommissions?: number
  paidCommissions?: number
  referralsCount?: number
  createdAt: string
  updatedAt: string
}
