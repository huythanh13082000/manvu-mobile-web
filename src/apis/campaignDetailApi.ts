import { Campaign } from '../types/campaign.type'
import axiosClient from './axiosClient'
import {ADVERTISER_CAMPAIGN, CAMPAIGN_API} from './urlConfig'

export const campaignDetailApi = {
  getCampaignDetail(id: number): Promise<Campaign> {
    return axiosClient.get(`${CAMPAIGN_API}/${id}`)
  },
  getAdvertiserCampaignDetail(id: number): Promise<Campaign> {
    return axiosClient.get(`${ADVERTISER_CAMPAIGN}/${id}`)
  },
}
