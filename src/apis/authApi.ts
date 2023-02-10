import {LoginType} from '../types/login.type'
import axiosClient from './axiosClient'
import {LOGIN} from './urlConfig'

export const authApi = {
  login: (params: {
    user_email: string
    user_password: string
  }): Promise<LoginType> => {
    return axiosClient.post(LOGIN, params)
  },
}
