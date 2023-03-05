import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://server.rivupang.com/api/',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})
export const setTokenAxios = () => {
  const token = localStorage.getItem('token') || ''
  axiosClient.defaults.headers.common['Authorization'] = token
}

axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    setTokenAxios()
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
