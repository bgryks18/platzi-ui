import { useQuery } from 'react-query'
import API from './api'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { ProductEntity } from '../types/entity'

export const getProducts = () => {
  const list = useSelector((state: RootState) => state.list)
  // const dispatch = useDispatch()

  return useQuery<ProductEntity[]>({
    queryKey: ['products'],
    queryFn: async ({ queryKey: [key, params] }) => {
      return new Promise((resolve, reject) =>
        API.get(`/products`, {
          params: {
            ...(params as any),
            limit: list.limit,
            offset: list.limit * list.pageIndex,
          },
        })
          .then((response) => {
            resolve(response.data)
          })
          .catch((e) => {
            reject(e)
          })
      )
    },
  })
}
