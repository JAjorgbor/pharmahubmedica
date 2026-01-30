import axios from 'axios'

const BASE_URL = 'https://nubapi.com/'
const TOKEN = process.env.NEXT_PUBLIC_NUBAPI_TOKEN

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' },
})

export const getBanks = async () => await axiosInstance.get('/bank-json')

export const verifyAccountDetails = async ({
  account_number,
  bank_code,
}: {
  account_number: string
  bank_code: string
}) =>
  await axiosInstance.get('api/verify', {
    params: { account_number, bank_code },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  })
