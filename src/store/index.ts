import { configureStore } from '@reduxjs/toolkit'
import listSlice from './list'
import uiSlice from './ui'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    list: listSlice,
    ui: uiSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
