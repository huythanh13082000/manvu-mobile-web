import axiosClient from './axiosClient'
import {MEMBER_HASHTAG_API} from './urlConfig'

export const hashTagApi = {
  getListHashTag() {
    return axiosClient.get(MEMBER_HASHTAG_API)
  },
}
