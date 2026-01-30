export interface IDeliveryAddress {
  _id: string
  label: string
  phoneNumber: string
  street: string
  city: string
  state: string
  country: string
  postalCode?: string
  createdAt: string
  updatedAt: string
}

export interface ICreateDeliveryAddress {
  label: string
  phoneNumber: string
  street: string
  city: string
  state: string
  country: string
  postalCode?: string
}

export interface IUpdateDeliveryAddress
  extends Partial<ICreateDeliveryAddress> {}
