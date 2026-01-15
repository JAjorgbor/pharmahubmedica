import { IProduct } from '@/api-client/interfaces/product.interfaces'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  items: {
    product: IProduct
    amount: number
    quantity: number
  }[]
  hasHydrated: boolean
}

type Action = {
  addProductToCart: ({
    product,
    quantity,
  }: {
    product: IProduct
    quantity: number
  }) => void
  removeProductFromCart: (productId: string) => void
  updateProductQuantity: (productId: string, quantity: number) => void
  setHasHydrated: (v: boolean) => void
  clearCart: () => void
}

type Store = State & Action

const useCart = create<Store>()(
  persist(
    (set) => ({
      items: [],
      hasHydrated: false,

      setHasHydrated: (v) => set({ hasHydrated: v }),

      addProductToCart: ({ product, quantity }) => {
        set((state) => {
          const existingProduct = state.items.find(
            (item) => item.product._id === product._id
          )
          if (existingProduct) {
            return {
              items: state.items.map((item) => {
                if (item.product._id === product._id) {
                  const newQuantity = item.quantity + quantity
                  const newAmount = newQuantity * item.product.price
                  return {
                    ...item,
                    quantity: newQuantity,
                    amount: newAmount,
                  }
                }
                return item
              }),
            }
          }

          return {
            items: [
              ...state.items,
              { product, amount: product.price * quantity, quantity: quantity },
            ],
          }
        })
      },
      updateProductQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product._id == productId
              ? {
                  ...item,
                  quantity: quantity,
                  amount: quantity * item.product.price,
                }
              : item
          ),
        }))
      },
      removeProductFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product._id !== productId),
        }))
      },
      clearCart: () => {
        set({ items: [] })
      },
    }),
    {
      name: 'portal-cart',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
export default useCart
