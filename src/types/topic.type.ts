export interface Topic {
  id: number
  text: string
  createdAt?: string
  updatedAt?: string
  user_topics: {
    id?: number
    text?: string
    createdAt?: string
    updatedAt?: string
  }
}
