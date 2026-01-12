import { useState, useEffect, useReducer } from 'react'

const initialState = []
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const array = [...state]
      const cartItem = array.find(
        ({ item }) => item?._id === action.payload._id
      )
      if (cartItem) {
        const itemIndex = array.indexOf(cartItem)
        cartItem.count +=
          action?.count ?? Number(process.env.NEXT_PUBLIC_CART_UPDATE_INTERVAL)
        array[itemIndex] = cartItem
      } else {
        array.push({ count: action?.count ?? 1, item: action.payload })
      }
      return array
    }
    case 'SET_ITEM_COUNT': {
      const array = [...state]
      const cartItem = array.find(
        ({ item }) => item?._id === action.payload._id
      )
      // if (cartItem){
      const itemIndex = array.indexOf(cartItem)
      cartItem.count = action.count
      array[itemIndex] = cartItem
      // }
      return array
    }
    case 'REMOVE_ITEM': {
      const array = [...state]
      const cartItem = array.find(
        ({ item }) => item?._id === action.payload._id
      )
      const itemIndex = array.indexOf(cartItem)
      array.splice(itemIndex, 1)

      return array
    }
    case 'SET_CART':
      return action.payload
    default:
      return state
  }
}
export default function () {
  const getInitialState = (initial) => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage ? localStorage.getItem('cart') : []
      return savedState ? JSON.parse(savedState) : initial
    }
  }
  const [cart, dispatch] = useReducer(reducer, initialState)
  const [startUpdatingCart, setStartUpdatingCart] = useState(false)

  useEffect(() => {
    const savedState = localStorage ? localStorage.getItem('cart') : []

    dispatch({
      type: 'SET_CART',
      payload: savedState ? JSON.parse(savedState) : [],
    })
    setStartUpdatingCart(true)
  }, [])
  useEffect(() => {
    if (startUpdatingCart) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [startUpdatingCart, cart])

  return [cart, dispatch]
}
