import {Campaign} from './campaign.type'

export interface InappNotification {
  id: number
  userId: string
  status: number
  title: string
  type: string
  message: string
  campaignId: number
  createdAt: string
  updatedAt: string
  campaign: Campaign
}
