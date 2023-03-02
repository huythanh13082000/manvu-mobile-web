import { Topic } from "./topic.type"

export interface UserMember {
  avatar?: string
  countPostAccepted?: number
  email?: string
  gender?: number
  snsEmail?: string
  snsLinks?: any[]
  topics?: Topic[]
  userId?: string
  username?: string
  addressList?: any[]
}