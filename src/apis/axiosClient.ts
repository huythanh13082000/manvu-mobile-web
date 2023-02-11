import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import { BASE_URL } from '../constants'



const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})
export const setTokenAxios = () => {
  const token = localStorage.getItem('accessToken')
  axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data
  },
  function (error) {
    console.log(error)
    // if ([401, 404].includes(error.response.status)) {
    //   localStorage.removeItem('token')
    // }
    return Promise.reject(error)
  }
)

export default axiosClient
