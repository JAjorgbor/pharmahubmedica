import { useReducer } from 'react'

const initialState = { num: 1, word: 'one' }

const reducer = (state, action) => {
  switch (action.type) {
    case 'SHOW': {
      console.log('what up')
      return state
    }
    default:
      console.log("that's all folks!")
      return state
  }
}
export default function useUpdateCart() {
  const [cartValue, dispatch] = useReducer(reducer, initialState)

  return [cartValue, dispatch]
}
