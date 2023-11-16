import { configureStore } from '@reduxjs/toolkit'
import listSlice from './list'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    list: listSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
