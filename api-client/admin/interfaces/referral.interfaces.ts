export interface IReferralPartner {
  _id: string
  user: User // Populated portal user
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
  accountDetails: {
    bankName: string
    accountNumber: string
    accountName: string
    bankCode: string
  }
  // Virtual fields
  commissionTotal?: number
  pendingCommissions?: number
  paidCommissions?: number
  referralsCount?: number
  createdAt: string
  updatedAt: string
}

interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
}

export interface IReferralUser {
  _id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  status: string
  joinedAt: string
}
