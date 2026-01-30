import axiosInstance from '@/api-client/admin/request-adapter'

export const getCustomers = (params?: any) =>
  axiosInstance.get(`admin/customers`, { params })

export const getCustomer = (userId: string) =>
  axiosInstance.get(`admin/customers/${userId}`)

export const updateCustomer = (userId: string, data: any) =>
  axiosInstance.patch(`admin/customers/${userId}`, data)

export const deleteCustomer = (userId: string) =>
  axiosInstance.delete(`admin/customers/${userId}`)

export const getCustomersNotReferralPartners = () =>
  axiosInstance.get(`admin/customers/non-referral-partners`)

export const getCustomersStats = () =>
  axiosInstance.get('admin/customers/stats')
