import React from 'react'

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { uniqBy } from 'lodash'

const limit = 10
interface PaginationProps {
  pageIndex: number
  limit: number
}

interface ListProps {
  data: any[]
  count: number
}

interface FilterProps {
  filter: {}
}
const initialState: PaginationProps & ListProps & FilterProps = {
  pageIndex: 0,
  limit,
  data: [],
  count: 0,
  filter: {},
}

const listSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPagination(state, action: PayloadAction<PaginationProps>) {
      return {
        ...state,
        limit: action.payload.limit,
        pageIndex: action.payload.pageIndex,
      }
    },
    setList(state, action: PayloadAction<ListProps>) {
      return {
        ...state,
        data: uniqBy([...state.data, ...action.payload.data], 'id'),
        count: action.payload.count,
      }
    },
    setFilter(
      state,
      action: PayloadAction<{ filter: Record<string, unknown> }>
    ) {
      return {
        ...state,
        filter: { ...state.filter, ...action.payload.filter },
      }
    },
    removeFilter(state, action: PayloadAction<string>) {
      return {
        ...state,
        filter: { ...state.filter, [action.payload]: undefined },
      }
    },
    resetFilter(state) {
      return { ...state, filter: {} }
    },
  },
})

export const { setList, setPagination, setFilter, removeFilter, resetFilter } =
  listSlice.actions
export default listSlice.reducer
