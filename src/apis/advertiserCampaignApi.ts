
import { ListParams } from '../types/common.type'
import { CreateCampaign } from '../types/createCampaign.type'
import axiosClient from './axiosClient'
import {ADVERTISER_CAMPAIGN} from './urlConfig'

export const advertiserCampaignApi = {
  createCampaign(params: CreateCampaign) {
    return axiosClient.post(ADVERTISER_CAMPAIGN, params)
  },
  updateCampaign(params: CreateCampaign) {
    return axiosClient.put(`${ADVERTISER_CAMPAIGN}/${params._id}`, params)
  },
  getAdvertiserCampaign(params: ListParams) {
    return axiosClient.get(ADVERTISER_CAMPAIGN, {params})
  },
}
