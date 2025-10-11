import headerSlice from '@/features/headerSlice'
import sidebarSlice from '@/features/sidebarSlice'
import userSlice from '@/features/userSlice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const rootReducer = combineReducers({
  sidebar: sidebarSlice,
  user: userSlice,
  header: headerSlice,
})

const loadState = () => {
  try {
    if (typeof window !== 'undefined') {
      const serializedState = localStorage.getItem('portal-state') as string
      if (serializedState === null) {
        return undefined
      }
      return JSON.parse(serializedState)
    } else return undefined
  } catch (error) {
    console.log('Error loading state from localStorage:', error)
    return undefined
  }
}

const saveState = (state: any) => {
  try {
    // if (typeof window !== 'undefined') {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('portal-state', serializedState)
    // }
  } catch (error) {
    console.log('Error saving state to local storage:', error)
  }
}
const preloadedState = loadState()

export const store = configureStore({
  preloadedState,
  reducer: rootReducer,
})

store.subscribe(() => {
  saveState(store.getState())
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export const useAppDispatch: () => typeof store.dispatch = useDispatch
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector
