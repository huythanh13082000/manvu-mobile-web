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
    console.log(345, response)
    if (response.data.code === 401) {
      localStorage.clear()
      alert('da het han dang nhap')
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
