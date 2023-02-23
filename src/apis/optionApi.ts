import {GetParamsType} from '../types/getParams.type'
import {OptionType} from '../types/option.type'
import axiosClient from './axiosClient'
import {OPTION} from './urlConfig'

export const optionApi = {
  create: (body: OptionType) => {
    return axiosClient.post(OPTION, body)
  },
  get: (params: GetParamsType) => {
    return axiosClient.get(OPTION, {params})
  },
  getDetail: (id: number) => {
    return axiosClient.get(`${OPTION}/${id}`)
  },
  update: (payload: OptionType) => {
    return axiosClient.put(`${OPTION}/${payload.id}`, payload)
  },
  delete: async (ids: number[]) => {
    return await axiosClient.delete(OPTION, {data: {ids}})
  },
  up_down: async (payload: {id: number; type: 'UP' | 'DOWN'}) => {
    return await axiosClient.put(`${OPTION}/up-down/${payload.id}`, {
      type: payload.type,
    })
  },
}
