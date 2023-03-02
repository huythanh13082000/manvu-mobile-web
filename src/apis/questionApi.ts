import axiosClient from './axiosClient'
import {QUESTION_API} from './urlConfig'

export const questionApi = {
  getQuestionApi(params: {limit: number; offset: number}) {
    return axiosClient.get(QUESTION_API, {params})
  },
  getQuestionDetailApi(params: number) {
    return axiosClient.get(`${QUESTION_API}/${params}`)
  },
  createQuestionApi(params: {
    images?: string[]
    thumbnails?: []
    content?: string
    category?: string
    phoneNumber?: string
    type?: string
  }) {
    return axiosClient.post(`${QUESTION_API}`, params)
  },
  updateQuestionApi(params: {
    id?: Number
    images?: string[]
    thumbnails?: string[]
    content?: string
    category?: string
    phoneNumber?: string
    type?: string
  }) {
    const data = {
      images: params.images,
      thumbnails: params.thumbnails,
      content: params.content,
      category: params.category,
      phoneNumber: params.phoneNumber,
      type: params.type,
    }
    return axiosClient.put(`${QUESTION_API}/${params.id}`, data)
  },

  deleteQuestionApi(id: number) {
    return axiosClient.delete(`${QUESTION_API}/${id}`)
  },
  answerQuestionApi(params: {
    id: number
    params: {content?: string; images?: string[]; thumbnails?: string[]}
  }) {
    return axiosClient.post(
      `${QUESTION_API}/answer/${params.id}`,
      params.params
    )
  },
}
