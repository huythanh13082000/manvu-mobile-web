import { User } from '../types/user.type'
import axiosClient from './axiosClient'
import {USER_API} from './urlConfig'

export const userApi = {
  getUser(): Promise<User> {
    return axiosClient.get(USER_API)
  },
  updateProfile(params: FormData) {
    return axiosClient.put(USER_API, params)
  },
}
