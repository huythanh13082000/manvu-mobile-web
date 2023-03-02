import axiosClient from './axiosClient'
import {MEMBER_CAMPAIGN_MINE} from './urlConfig'

export const memberCampaignMineApi = {
  getMemberCampaignMine(params: {
    type: string
    medias?: string
    tagIds?: string
    sortBy?: string
  }) {
    return axiosClient.get(`${MEMBER_CAMPAIGN_MINE}/${params.type}`, {
      params: {
        medias: params.medias,
        tagIds: params.tagIds,
        sortBy: params.sortBy,
      },
    })
  },
}
