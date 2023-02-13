export interface OrderProjectType {
  projectName: string
  planFile: string | FormData
  maximumBudget: number
  governmentSupport: boolean
  description: string
  customerName: string
  companyName: string
  position: string
  email: string
  phone: string
  platform: string
  isDone: string
  estimatedCost: number
  estimatedTime: number
  orderId: number
  created_at: string
}
