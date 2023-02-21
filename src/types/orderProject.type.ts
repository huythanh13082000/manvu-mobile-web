export interface OrderProjectType {
  projectName: string
  planFile?: string | string[]
  maximumBudget?: number
  governmentSupport: boolean
  description?: string
  customerName: string
  companyName: string
  position: string
  email: string
  phone: string
  platform: 'WEB_APP' | 'MOBILE_APP' | 'BOTH' | 'NOTHING'
  isDone?: boolean
  estimatedCost?: number
  estimatedTime?: number
  orderId?: number
  created_at?: string
  presenter?: string
}
