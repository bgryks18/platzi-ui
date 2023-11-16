import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { useMutation } from 'react-query'
import API from '../api/api'
import { setList } from '../store/list'
import { Entity } from '../types/entity'

const useList = ({ moduleName }: { moduleName: string }) => {
  const list = useSelector((state: RootState) => state.list)

  console.log('list', list)
  const dispatch = useDispatch()
  const {
    mutate: fetchList,
    isLoading: isMutationLoading,
    isIdle,
    data = [],
    ...rest
  } = useMutation<Entity[]>(() => {
    return new Promise((resolve, reject) =>
      API.get(`/${moduleName}`, {
        params: {
          offset: list.pageIndex * list.limit,
          limit: list.limit,
          ...list.filter,
        },
      })
        .then((response) => {
          const count = response.headers['x-bone-count'] || 30 //test
          dispatch(setList({ data: response.data, count }))
          resolve(response.data)
        })
        .catch((e) => {
          reject(e)
        })
    )
  }, {})

  const isLoading = isIdle || isMutationLoading

  useEffect(() => {
    fetchList()
  }, [list.pageIndex, list.limit, list.filter])

  return {
    mutate: fetchList,
    isIdle,
    isLoading,
    data,
    ...rest,
  }
}

export default useList
