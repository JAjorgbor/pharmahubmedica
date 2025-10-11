import type { UserState } from '@/features/interfaces'
import { createSlice } from '@reduxjs/toolkit'

const initialState: UserState = {
  userId: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserId } = userSlice.actions

export default userSlice.reducer
