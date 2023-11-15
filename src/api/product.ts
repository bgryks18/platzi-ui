import API from './api'

export const getProducts = async ({
  offset,
  limit,
}: {
  offset: number
  limit: number
}) => {
  return await API.get('/products', {
    params: {
      offset,
      limit,
    },
  })
}
