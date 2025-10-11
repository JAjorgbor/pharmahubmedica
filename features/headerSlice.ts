import { createSlice } from '@reduxjs/toolkit'
import type { HeaderState } from '@/features/interfaces'

const initialState: HeaderState = {
  title: '',
}

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setHeaderTitle: (state, action) => {
      state.title = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setHeaderTitle } = headerSlice.actions

export default headerSlice.reducer
