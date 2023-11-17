import { useMutation } from 'react-query'
import API from './api'

export const deleteItem = (resource: string) => {
  return useMutation((id: string | number) => {
    return new Promise((resolve, reject) =>
      API.delete(`/${resource}/${id}`)
        .then((response) => resolve(response.data))
        .catch((e) => reject(e))
    )
  }, {})
}

export const updateItem = (resource: string) => {
  return useMutation(({ id, ...data }: Record<string, any>) => {
    return new Promise((resolve, reject) =>
      API.put(`/${resource}/${id}`, data)
        .then((response) => resolve(response.data))
        .catch((e) => reject(e))
    )
  }, {})
}

export const createItem = (resource: string) => {
  return useMutation((data: Record<string, any>) => {
    return new Promise((resolve, reject) =>
      API.post(`/${resource}`, data)
        .then((response) => resolve(response.data))
        .catch((e) => reject(e))
    )
  }, {})
}
