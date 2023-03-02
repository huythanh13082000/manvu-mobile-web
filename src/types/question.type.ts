export interface Question {
  id: number
  type: string
  status: string
  phoneNumber: string
  category: string
  content: string
  images: string[]
  thumbnails: []
  userId: string
  createdAt: string
  updatedAt: string
  user: {
    userId: string
    email: string
    username: string
    avatar: string
  }
  answers: Question[]
}
