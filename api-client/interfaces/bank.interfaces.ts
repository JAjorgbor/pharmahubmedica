export interface IBank {
  id?: number
  name: string
  slug?: string
  code: string
  longcode?: string
  country?: string
  currency?: string
  gateway?: string
  type?: string
  active?: boolean
  is_deleted?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface IAccountDetails {
  account_number: string
  account_name: string
  first_name: string
  last_name: string
  other_name: string
  Bank_name: string
  bank_code: string
  requests: string
  status: boolean
}
