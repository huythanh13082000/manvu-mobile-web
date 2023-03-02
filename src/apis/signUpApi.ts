import axiosClient from './axiosClient'
import {
  SIGNUP_ADVERTISER_API,
  SIGNUP_MEMBER_API,
  SIGNUP_SNS_API,
} from './urlConfig'
export const signUpApi = {
  signUpMember(params: FormData) {
    return axiosClient.post(SIGNUP_MEMBER_API, params)
  },
  signUpAdvertiser(params: FormData) {
    return axiosClient.post(SIGNUP_ADVERTISER_API, params)
  },
  signUpMemberSns(params: FormData) {
    return axiosClient.post(`${SIGNUP_SNS_API}/member`, params)
  },
  signUpAdvertiserSns(params: FormData) {
    return axiosClient.post(`${SIGNUP_SNS_API}/advertiser`, params)
  },
}
