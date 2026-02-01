export interface IAdminUser {
  _id: string
  firstName: string
  lastName: string
  email: string
  status: 'active' | 'inactive' | 'pending'
  role: string
  gender: string
  phoneNumber?: string
  avatar?: {
    url: string
    key?: string
  }
}
