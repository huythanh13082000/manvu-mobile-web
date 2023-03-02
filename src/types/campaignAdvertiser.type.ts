import {Categories} from './categories.type'
import { UserMember } from './userMember.type';

export interface CampaignAdvertiser {
  tags: number[]
  images: string[]
  applications: {color: string; text: string}
  areaIds: []
  id: number
  userId: string
  name: string
  shortDescription: string
  offers: string
  content: string
  keywords: string
  mission: string
  notes: string
  media: string
  campaignRegistrationDateFrom: string
  campaignRegistrationDateTo: string
  announcementToMemberDate: string
  contentRegistrationDateFrom: string
  contentRegistrationDateTo: string
  announcementFinalDate: string
  numberOfRecruit: number
  numberOfParticipants: number
  point: number
  status: number
  completeAt: string | null
  tabId: number
  view: number
  isAddress: boolean
  adddress: string | null
  latitude: number
  longitude: number
  position: {}
  createdAt: string
  updatedAt: string
  user: {}
  members: {
    createdAt: string
    user: UserMember
    id: string
    status: number
    campaignId: number
    postId: number
    userId: string
    post: {
      campaignId: number
      createdAt: string
      id: number
      interactive: boolean
      point: number
      review: string
      status: number
      transactionId: number
      updatedAt: string
      url: string
      userId: string
      view: number
    }
  }[]
  interactive: {}
  categories: Categories[]
  joinRequests: {
    cameraType: string
    cameraTypeNote: string
    campaignId: number
    comment: string
    createdAt: string
    id: number
    post: {
      review: string
      url: string
    }
    postId: number
    status: number
    updatedAt: string
  }[]

  distance?: number
}
