export interface SignUpMember {
  avatar?: string
  email: string
  username: string
  password: string
  gender: 0 | 1
  phoneNumber: string
  addressList: {
    address: number
    receiver: string
    receiverReceive: boolean
  }
  snsLinks?: [{}]
  topicIds?: number[]
}
