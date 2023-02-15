import {GetParamsType} from '../types/getParams.type'
import {OrderProjectType} from '../types/orderProject.type'
import axiosClient from './axiosClient'
import {ORDER_PROJECT} from './urlConfig'

export const orderProjectApi = {
  get: (params: GetParamsType) => {
    return axiosClient.get(ORDER_PROJECT, {params})
  },
  getDetail: (id: number) => {
    return axiosClient.get(`${ORDER_PROJECT}/${id}`)
  },
  update: (payload: OrderProjectType) => {
    return axiosClient.put(`${ORDER_PROJECT}/${payload.orderId}`, payload)
  },
  delete: async (ids: number[]) => {
    return await axiosClient.delete(ORDER_PROJECT, {data: {ids}})
  },
}
