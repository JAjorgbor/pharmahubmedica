export interface IPortalUser {
  security: Security
  _id: string
  firstName: string
  lastName: string
  gender: string
  email: string
  phoneNumber: string
  isEmailVerified: boolean
  status: string
  dateOfBirth: string | undefined
  createdAt: Date
  updatedAt: Date
  __v: number
  deliveryAddresses: any[]
  isReferralPartner: boolean
}

export interface Security {
  authProvider: string
}
