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
  resource: string
}

interface FilterProps {
  filter: Record<string, any>
}
const initialState: PaginationProps & ListProps & FilterProps = {
  pageIndex: 0,
  limit,
  count: 0,
  filter: {},
  data: [],
  resource: '',
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
      if (state.resource !== action.payload.resource) {
        return {
          ...initialState,
          data: action.payload.data,
          count: action.payload.count,
          resource: action.payload.resource,
        }
      }

      return {
        ...state,
        data: action.payload.data,
        count: action.payload.count,
        resource: action.payload.resource,
      }
    },
    removeItem(state, action: PayloadAction<{ id: string | number }>) {
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload.id),
      }
    },
    setItem(state, action: PayloadAction<{ data: Record<string, any> }>) {
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.id === action.payload.data.id) {
            return { ...item, ...action.payload.data }
          } else {
            return item
          }
        }),
      }
    },
    addItem(state, action: PayloadAction<{ data: Record<string, any> }>) {
      return {
        ...state,
        data: uniqBy([...state.data, action.payload.data], 'id'),
      }
    },
    setFilter(
      state,
      action: PayloadAction<{
        filter: Record<string, unknown>
        resource: string
      }>
    ) {
      return {
        ...state,
        filter: {
          ...state.filter,
          [action.payload.resource]: {
            ...state.filter[action.payload.resource],
            ...action.payload.filter,
          },
        },
      }
    },
    removeFilter(
      state,
      action: PayloadAction<{ name: string; resource: string }>
    ) {
      return {
        ...state,
        filter: {
          ...state.filter,
          [action.payload.resource]: {
            ...state.filter[action.payload.resource],
            [action.payload.name]: undefined,
          },
        },
      }
    },
    resetFilter(state) {
      return { ...state, filter: {} }
    },
  },
})

export const {
  setList,
  setPagination,
  setFilter,
  removeFilter,
  resetFilter,
  removeItem,
  setItem,
  addItem,
} = listSlice.actions
export default listSlice.reducer
