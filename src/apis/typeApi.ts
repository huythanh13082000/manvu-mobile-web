import {GetParamsType} from '../types/getParams.type'
import {TagType} from '../types/tag.type'
import { TypeType } from '../types/type.type'
import axiosClient from './axiosClient'
import {TYPE} from './urlConfig'

export const typeApi = {
  create: (body: TagType) => {
    return axiosClient.post(TYPE, body)
  },
  get: (params: GetParamsType) => {
    return axiosClient.get(TYPE, {params})
  },
  getDetail: (id: number) => {
    return axiosClient.get(`${TYPE}/${id}`)
  },
  update: (payload: TypeType) => {
    return axiosClient.put(`${TYPE}/${payload.id}`, payload)
  },
  delete: async (ids: number[]) => {
    return await axiosClient.delete(TYPE, {data: {ids}})
  },
  // up_down: async (payload: {id: number; type: 'UP' | 'DOWN'}) => {
  //   return await axiosClient.put(`${TYPE}/up-down/${payload.id}`, {
  //     type: payload.type,
  //   })
  // },
}
