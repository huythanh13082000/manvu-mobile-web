import { PointTransaction } from '../types/pointTransaction.type'
import axiosClient from './axiosClient'
import {POINT_TRANSACTION_API} from './urlConfig'

export const pointTransactionApi = {
  getPointTransaction(params: {
    limit: number
    offset: number
  }): Promise<{list?: PointTransaction[]}> {
    return axiosClient.get(POINT_TRANSACTION_API, {params})
  },
}
