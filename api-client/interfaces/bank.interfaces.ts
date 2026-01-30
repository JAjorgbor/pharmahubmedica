export interface IBank {
  id: number
  name: string
  code: string
  slug: string
  created_at: Date
  updated_at: Date
  longcode: string
  gateway: string
  pay_with_bank: number
  active: number
  country: string
  currency: string
  type: string
  is_deleted: number
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
