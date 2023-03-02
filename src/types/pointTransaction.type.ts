import {Campaign} from './campaign.type'

export interface PointTransaction {
  meta: {
    campaignId: number
    campaignName: string
    fromUserEmail: string
    fromUserUsername: string
    postId: number
    toUserEmail: string
    toUserUsername: string
    title:string
  }
  id: number
  fromUserId: string
  toUserId: string
  point: number
  type: number
  status: number
  createdAt: string
  updatedAt: string
  fromUser: {}
  toUser: {}
  campaign: Campaign
}
