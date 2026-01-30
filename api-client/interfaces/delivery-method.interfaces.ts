export interface IDeliveryMethod {
  _id: string
  name: string
  fee: number
  estimatedDeliveryTime: string
  description: string
  isActive: boolean
  visibility: boolean
  createdAt: string
  updatedAt: string
}

export interface ICreateDeliveryMethod {
  name: string
  fee: number
  estimatedDeliveryTime: string
  isActive?: boolean
  visibility?: boolean
}

export interface IUpdateDeliveryMethod extends Partial<ICreateDeliveryMethod> {}
