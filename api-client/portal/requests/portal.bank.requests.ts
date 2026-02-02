import axiosInstance from '@/api-client/request-adapter'

export const getBanks = async () => await axiosInstance.get('/portal/banks')

export const verifyAccountDetails = async ({
  accountNumber,
  bankCode,
}: {
  accountNumber: string
  bankCode: string
}) =>
  await axiosInstance.get('portal/banks/validate-account', {
    params: { accountNumber, bankCode },
  })
