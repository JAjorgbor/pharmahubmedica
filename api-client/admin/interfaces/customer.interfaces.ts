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
  referredBy?: string
  totalSpent?: number
  createdAt: string
  updatedAt: string
}
