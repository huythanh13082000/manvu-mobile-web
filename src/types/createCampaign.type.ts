export interface CreateCampaign {
  _id?: number
  name?: string
  shortDescription?: string
  content?: string
  tags?: string[] | number[]
  media?: string
  images?: string[]
  images1?: any[]
  campaignRegistrationDateFrom?: string
  campaignRegistrationDateTo?: string
  announcementToMemberDate?: string
  contentRegistrationDateFrom?: string
  contentRegistrationDateTo?: string
  announcementFinalDate?: string
  numberOfRecruit?: number
  applications?: {color: string; text: string}
  point?: number
  categoryIds?: number[]
  memberIds?: string[]
  tabId?: number
  areaIds?: {
    id: number
    area: string
    subArea: string
  }[]
  color?: string
  adddress?: string
  keywords?: string
  mission?: string
  isAddress?: boolean
  addressDetail?: string
  formData?: FormData
  offers?: string
  notes?: string
  latitude?: number
  longitude?: number
  contactPhone?: string
}
