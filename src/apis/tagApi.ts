import { GetParamsType } from '../types/getParams.type'
import { TagType } from '../types/tag.type'
import axiosClient from './axiosClient'
import { TAG } from './urlConfig'

export const tagApi = {
  create: (body: TagType) => {
    return axiosClient.post(TAG, body)
  },
  get: (params: GetParamsType) => {
    return axiosClient.get(TAG, {params})
  },
  getDetail: (id: number) => {
    return axiosClient.get(`${TAG}/${id}`)
  },
  update: (payload: TagType) => {
    return axiosClient.put(`${TAG}/${payload.id}`, payload)
  },
  delete: async (ids: number[]) => {
    return await axiosClient.delete(TAG, {data: {ids}})
  },
}
