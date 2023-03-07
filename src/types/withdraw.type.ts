export interface Withdraw {
  recipientInformation: {
    bankName: string
    bankAccountNumber: number | string
    name: string
    identityCard: number | string
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
    bankAccountNumber: string | number
    name: string
    identityCard: string | number
  }
  point: number
  id?: number
}
