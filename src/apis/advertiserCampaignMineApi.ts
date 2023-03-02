import axiosClient from './axiosClient'
import {ADVERTISER_CAMPAIGN_MINE} from './urlConfig'
export const advertiserCampaignMineApi = {
  getAdvertiserCampaignMine(params: {type: string; medias?: string}) {
    return axiosClient.get(`${ADVERTISER_CAMPAIGN_MINE}/${params.type}`, {
      params: {medias: params.medias, limit: 200},
    })
  },
}
