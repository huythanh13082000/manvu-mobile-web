import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import {BASE_URL} from '../constants'

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    const token = localStorage.getItem('accessToken')
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    if (response.data.code === 401) {
      if (
        window.confirm('로그인 세션이 만료되었습니다. 다시 로그인하십시오.')
      ) {
        localStorage.clear()
        window.location.reload()
      }
    } else return response.data
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
