import axiosClient from './axiosClient'
import {CAMPAIGN_API} from './urlConfig'

export const campaignCategoriesApi = {
  getListCampaignCategories(params: {
    tabId?: number
    categoryId?: number
    limit?: number
    sortBy?: string
    lat?: number
    lng?: number
    sortDir?: string
  }) {
    return axiosClient(`${CAMPAIGN_API}`, {params})
  },
}
