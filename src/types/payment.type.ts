export interface PaymentModel {
  type: string
  price: string
  depositorName?: string
  card?: {
    type: string
    accountName: string
    cardNumber: string
    expirationMonth: number
    expirationYear: number
  }
  package?:string
  numberOfMonths?:string
}

export interface PaymentListModel {
  card: string
  cardId: string
  createdAt: string
  depositorName: string
  id: number
  price: string
  status: string
  type: string
  updatedAt: string
  user: {username: string; email: string}
  userId: string
}
