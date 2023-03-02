export interface Withdraw {
  recipientInformation: {
    bankName: string
    bankAccountNumber: number
    name: string
    identityCard: number
  }
  id: number
  userId: string
  status: number
  point: number
  createdAt: string
  updatedAt: string
}
export interface WithdrawMoney {
  status: number
  recipientInformation: {
    bankName: string
    bankAccountNumber: string
    name: string
    identityCard: string
  }
  point: number
}
