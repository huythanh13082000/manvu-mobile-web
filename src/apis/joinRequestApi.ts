import axiosClient from './axiosClient'
import {JOIN_REQUEST_APT} from './urlConfig'

export const joinRequestApi = {
  createRequest(id: number) {
    return axiosClient.post(`${JOIN_REQUEST_APT}/${id}`)
  },
  deleteRequest(id: number) {
    return axiosClient.delete(`${JOIN_REQUEST_APT}/${id}`)
  },
  deleteRequests(ids: number[]) {
    return axiosClient.delete(JOIN_REQUEST_APT, {
      data: {campaignIds: ids},
    })
  },
}
