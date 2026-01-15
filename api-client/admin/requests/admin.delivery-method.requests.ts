import {
  ICreateDeliveryMethod,
  IDeliveryMethod,
  IUpdateDeliveryMethod,
} from '@/api-client/interfaces/delivery-method.interfaces'
import adminRequestAdapter from '@/api-client/admin/request-adapter'

const getDeliveryMethods = async (params?: Record<string, any>) => {
  return adminRequestAdapter<IDeliveryMethod[]>({
    method: 'GET',
    url: '/admin/delivery-methods',
    params,
  })
}

const createDeliveryMethod = async (data: ICreateDeliveryMethod) => {
  return adminRequestAdapter<IDeliveryMethod>({
    method: 'POST',
    url: '/admin/delivery-methods',
    data,
  })
}

const updateDeliveryMethod = async (
  id: string,
  data: IUpdateDeliveryMethod
) => {
  return adminRequestAdapter<IDeliveryMethod>({
    method: 'PATCH',
    url: `/admin/delivery-methods/${id}`,
    data,
  })
}

const deleteDeliveryMethod = async (id: string) => {
  return adminRequestAdapter<void>({
    method: 'DELETE',
    url: `/admin/delivery-methods/${id}`,
  })
}

export const adminDeliveryMethodRequests = {
  getDeliveryMethods,
  createDeliveryMethod,
  updateDeliveryMethod,
  deleteDeliveryMethod,
}
