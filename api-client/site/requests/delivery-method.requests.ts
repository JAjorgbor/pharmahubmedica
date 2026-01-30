import { IDeliveryMethod } from '@/api-client/interfaces/delivery-method.interfaces'
import siteRequestAdapter from '@/api-client/request-adapter'

const getDeliveryMethods = async (params?: Record<string, any>) => {
  return siteRequestAdapter<IDeliveryMethod[]>({
    method: 'GET',
    url: '/delivery-methods',
    params,
  })
}

export const siteDeliveryMethodRequests = {
  getDeliveryMethods,
}
