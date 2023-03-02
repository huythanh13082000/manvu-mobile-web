import { AdvertiserCampaignMineCount } from '../types/advertiserCampaignMineCount.type'
import axiosClient from './axiosClient'
import {ADVERTISER_CAMPAIGN_MINE_COUNT} from './urlConfig'

export const advertiserCampaignMineCountApi = {
  getAdvertiserCampaignMineCount(): Promise<AdvertiserCampaignMineCount> {
    return axiosClient.get(ADVERTISER_CAMPAIGN_MINE_COUNT)
  },
}
