import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://3.35.47.171:3535/',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})
// export const setTokenAxios = () => {}
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    const token = localStorage.getItem('token') || ''
    axiosClient.defaults.headers.common['Authorization'] = token
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
