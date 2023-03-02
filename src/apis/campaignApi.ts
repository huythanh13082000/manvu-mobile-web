import { Campaign } from '../types/campaign.type'
import { ListParams } from '../types/common.type'
import axiosClient from './axiosClient'
import {ADVERTISER_CAMPAIGN, CAMPAIGN_API} from './urlConfig'
export const campaignApi = {
  getListCampaign(params: ListParams): Promise<Campaign> {
    return axiosClient.get(CAMPAIGN_API, {params})
  },
  getListCampaignSearch(params: {search: string}) {
    return axiosClient.get(CAMPAIGN_API, {params})
  },
  campaignPost(params: {id: number; url: string}) {
    return axiosClient.post(`${CAMPAIGN_API}/${params.id}/post`, {
      url: params.url,
    })
  },
  campaignUpdate(params: {id: number; url: string}) {
    return axiosClient.put(`${CAMPAIGN_API}/${params.id}/post`, {
      url: params.url,
    })
  },
  campaignPostStatus(params: {
    id: number
    idPost: number
    status: number
    review: string
  }) {
    return axiosClient.put(
      `${ADVERTISER_CAMPAIGN}/${params.id}/post/status/${params.idPost}`,
      {
        status: params.status,
        review: params.review,
      }
    )
  },
}
