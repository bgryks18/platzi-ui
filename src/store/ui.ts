import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ToastEntity {
  label: string
  description: string
}
interface UiProps {
  toast?: ToastEntity
}

const initialState: UiProps = {}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setToast(state, action: PayloadAction<UiProps>) {
      return {
        ...state,
        toast: action.payload.toast,
      }
    },
  },
})

export const { setToast } = uiSlice.actions
export default uiSlice.reducer
