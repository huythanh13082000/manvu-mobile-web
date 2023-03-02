export interface TabFaq {
  id: number
  title: string
  createdAt: string
  updatedAt: string
}

export interface FaqDetail {
  id: number
  title: string
  content: string
  faqCategoryId: number
  createdAt: string
  updatedAt: string
}
