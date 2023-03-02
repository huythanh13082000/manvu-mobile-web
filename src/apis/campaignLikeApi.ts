import axiosClient from './axiosClient'
import {ADVERTISER_CAMPAIGN_LIKE, MEMBER_CAMPAIGN_LIKE} from './urlConfig'

export const campaignLikeApi = {
  postMemberCampaignLike(id: number) {
    return axiosClient.post(`${MEMBER_CAMPAIGN_LIKE}/${id}/like`)
  },
  postMemberCampaignUnLike(id: number) {
    return axiosClient.post(`${MEMBER_CAMPAIGN_LIKE}/${id}/unlike`)
  },
  postAdvertiserCampaignLike(id: number) {
    return axiosClient.post(`${ADVERTISER_CAMPAIGN_LIKE}/${id}/like`)
  },
  postAdvertiserCampaignUnLike(id: number) {
    return axiosClient.post(`${ADVERTISER_CAMPAIGN_LIKE}/${id}/unlike`)
  },
  
}
