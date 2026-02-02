import axiosInstance from '@/api-client/admin/request-adapter'

export const getBanks = async () => await axiosInstance.get('/admin/banks')

export const verifyAccountDetails = async ({
  accountNumber,
  bankCode,
}: {
  accountNumber: string
  bankCode: string
}) =>
  await axiosInstance.get('admin/banks/validate-account', {
    params: { accountNumber, bankCode },
  })
