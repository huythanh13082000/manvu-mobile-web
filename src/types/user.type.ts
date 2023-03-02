export interface User {
  id: string
  name: string
  addressList: {
    address: string
    receiver: string
    receiverReceive?: boolean
    addressPostal: string
    addressPostalDetail: string
    codePostal: string
    phoneNumber: string
    phoneNumberAndCodePostal: string
  }[]
  avatar: string | FormData
  avatars: string[]
  bankAccount: {}
  companyAddress: string
  companyBusinessType: string
  companyLink: string
  companyName: string
  companyRegistrationNumber: string
  companyStaffContact: string
  companyTargetGender: string
  companyYearFounded: string
  createdAt: string
  dateOfBirth: string
  email: string
  expiresAt: string
  gender: number
  images: []
  lastLoginAt: string
  loginType: number
  phoneNumber: string
  point: number
  roles: {
    createdAt: string
    id: number
    name: string
    updatedAt: string
    user_roles: {}
  }[]
  snsEmail: string
  snsLinks: {}[]
  status: number
  token: string
  topics: {
    createdAt: string
    id: number
    text: string
    updatedAt: string
    user_topics: {}
  }[]
  updatedAt: string
  userId: string
  username: string
}
