
import { LoginPayload } from '../types/loginPayload.type'
import { User } from '../types/user.type'
import axiosClient from './axiosClient'
import {
  FORGOT_PASSWORD_SEND_MAIL_API,
  SIGNIN_SNS_API,
  SIGNUP_MEMBER_API,
  SIGN_IN_API,
  USER_API,
} from './urlConfig'

export const authApi = {
  post(data: LoginPayload): Promise<User> {
    return axiosClient.post(SIGN_IN_API, data)
  },
  signUpMember(data: any) {
    return axiosClient.post(SIGNUP_MEMBER_API, data)
  },
  getUser() {
    return axiosClient.get(USER_API)
  },
  forgotPassWordSendMail(params: {email: string}): Promise<number> {
    return axiosClient.post(FORGOT_PASSWORD_SEND_MAIL_API, params)
  },
  signInSns(params: {loginType: number; snsLoginId: string}) {
    return axiosClient.post(SIGNIN_SNS_API, params)
  },

}
