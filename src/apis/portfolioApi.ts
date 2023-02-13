import {GetParamsType} from '../types/getParams.type'
import {PortfolioType} from '../types/portfolio.type'
import axiosClient from './axiosClient'
import {PORTFOLIO} from './urlConfig'

export const portfolioApi = {
  create: (payload: PortfolioType) => {
    return axiosClient.post(PORTFOLIO, payload)
  },
  get: (params: GetParamsType) => {
    return axiosClient.get(PORTFOLIO, {params})
  },
  getDetail: (id: number) => {
    return axiosClient.get(`${PORTFOLIO}/${id}`)
  },
  update: (payload: PortfolioType) => {
    return axiosClient.put(`${PORTFOLIO}/${payload.portfolio_id}`, payload)
  },
  delete: async (ids: number[]) => {
    return await axiosClient.delete(PORTFOLIO, {data: {ids}})
  },
}
