import axiosClient from './axiosClient'
import {ADVERTISER_POST_API} from './urlConfig'

export const advertiserLikePostApi = {
  advertiserLikePost(id: number) {
    return axiosClient.post(`${ADVERTISER_POST_API}/${id}/like`)
  },
  advertiserUnLikePost(id: number) {
    return axiosClient.post(`${ADVERTISER_POST_API}/${id}/unlike`)
  },
}
