import { IReferralPartner } from '@/api-client/interfaces/referral-partner.interfaces'
import { IDeliveryAddress } from './delivery-address.interfaces'
import { IDeliveryMethod } from './delivery-method.interfaces'

export interface IOrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
  amount: number
  productImage?: {
    url: string
    key: string
  }
}

export interface IOrder {
  _id: string
  orderNumber: string
  customer: {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
  }
  products: IOrderItem[]
  transaction: {
    discountCode?: string
    discount?: number
    deliveryFee?: number
    subTotal?: number
    totalAmount: number
  }
  deliveryAddress: IDeliveryAddress
  deliveryMethod: IDeliveryMethod
  orderStatus: 'processing' | 'in-transit' | 'cancelled' | 'delivered'
  orderAudit: {
    processedAt: any
    inTransitAt: any
    cancelledAt: any
    deliveredAt: any
  }
  paymentStatus: 'pending' | 'paid' | 'failed' | 'abandoned' | 'reversed'
  note?: string
  trackingId?: string
  referralDetails?: {
    referralPartner: IReferralPartner
    commission: {
      rate: number
      rateType: 'percentage' | 'fixed'
      amount: number
      status: 'paid' | 'pending' | 'cancelled'
      note: string
    }
  }
  createdAt: string
  updatedAt: string
}

export interface ICreateOrder {
  customer: string
  items: { productId: string; quantity: number }[]
  deliveryAddress: string
  deliveryMethod: string
}

export interface IUpdateOrderStatus {
  orderStatus?: IOrder['orderStatus']
  paymentStatus?: IOrder['paymentStatus']
  trackingId?: string
  note?: string
  referralCommissionStatus?: 'paid' | 'pending' | 'cancelled'
  referralCommissionNote?: string
}
