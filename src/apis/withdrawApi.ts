import { Withdraw, WithdrawMoney } from '../types/withdraw.type'
import axiosClient from './axiosClient'
import {WITHDRAW_API} from './urlConfig'

export const withdrawApi = {
  getListWithdraw(params: {
    limit: number
    offset: number
  }): Promise<{list: Withdraw[]}> {
    return axiosClient.get(WITHDRAW_API, {params})
  },
  createWithdrawMoney(params: WithdrawMoney): Promise<any> {
    return axiosClient.post(WITHDRAW_API, params)
  },
}
