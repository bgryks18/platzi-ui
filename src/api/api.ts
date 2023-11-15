import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

export const API_URL = import.meta.env.VITE_API_URL

const API = axios.create({
  baseURL: API_URL,
})

const requestBefore = (config: InternalAxiosRequestConfig) => {
  return config
}

const requestError = (error: AxiosError): Promise<AxiosError> =>
  Promise.reject(error)

const responseError = (error: AxiosError): Promise<AxiosError> =>
  Promise.reject(error)

const responseBefore = (response: AxiosResponse): AxiosResponse => {
  const count = response.headers['x-bone-count'] || 66
  return response
}

API.interceptors.request.use(requestBefore, requestError)
API.interceptors.response.use(responseBefore, responseError)

export default API
