
import { Categories } from '../types/categories.type'
import axiosClient from './axiosClient'
import {HOME_OPTIONS_API} from './urlConfig'

export const tabApi = {
  getListTab(params: {
    tabId?: number
    categoryId?: number
  }): Promise<Categories> {
    return axiosClient.get(`${HOME_OPTIONS_API}/${params.tabId}`)
  },
}
