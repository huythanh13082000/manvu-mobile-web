import axiosClient from './axiosClient'
import {FAQ_CATEGORIES} from './urlConfig'

export const faqApi = {
  getListTabFaq() {
    return axiosClient.get(FAQ_CATEGORIES)
  },
  getListFaqDetail(id: number) {
    return axiosClient.get(`${FAQ_CATEGORIES}/${id}`)
  },
}
