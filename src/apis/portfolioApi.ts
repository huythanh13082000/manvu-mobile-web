import { PortfolioType } from '../types/portfolio.type'
import axiosClient from './axiosClient'
import {PORTFOLIO} from './urlConfig'

export const portfolioApi = {
  create: (payload: PortfolioType) => {
    return axiosClient.post(PORTFOLIO, payload)
  },
}
