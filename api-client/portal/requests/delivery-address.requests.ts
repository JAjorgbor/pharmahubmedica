import {
  ICreateDeliveryAddress,
  IDeliveryAddress,
  IUpdateDeliveryAddress,
} from '@/api-client/interfaces/delivery-address.interfaces'
import portalRequestAdapter from '@/api-client/request-adapter'

const getDeliveryAddresses = async (userId: string) => {
  return portalRequestAdapter<IDeliveryAddress[]>({
    method: 'GET',
    url: `/portal/delivery-address/${userId}`,
  })
}

const createDeliveryAddress = async (
  userId: string,
  data: ICreateDeliveryAddress
) => {
  return portalRequestAdapter<IDeliveryAddress>({
    method: 'POST',
    url: `/portal/delivery-address/${userId}`,
    data,
  })
}

const updateDeliveryAddress = async (
  userId: string,
  addressId: string,
  data: IUpdateDeliveryAddress
) => {
  return portalRequestAdapter<IDeliveryAddress>({
    method: 'PATCH',
    url: `/portal/delivery-address/${userId}/${addressId}`,
    data,
  })
}

const deleteDeliveryAddress = async (userId: string, addressId: string) => {
  return portalRequestAdapter<void>({
    method: 'DELETE',
    url: `/portal/delivery-address/${userId}/${addressId}`,
  })
}

export const portalDeliveryAddressRequests = {
  getDeliveryAddresses,
  createDeliveryAddress,
  updateDeliveryAddress,
  deleteDeliveryAddress,
}
