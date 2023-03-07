import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Question } from '../../types/question.type'
import { mereListById } from '../../utils'

export interface RequestState {
  loadding: boolean
  list: Question[]
  questionDetail?: Question
  total: number
}

const initialState: RequestState = {
  loadding: false,
  list: [],
  total: 0,
}
const requestSlice = createSlice({
  name: 'requestSlice',
  initialState,
  reducers: {
    getListQuestion(
      state,
      action: PayloadAction<{limit: number; offset?: number}>
    ) {
      state.loadding = true
    },
    getListQuestion2(
      state,
      action: PayloadAction<{limit: number; offset?: number}>
    ) {
      state.loadding = true
    },
    getListQuestionSuccess(
      state,
      action: PayloadAction<{list: Question[]; total: number}>
    ) {
      state.loadding = false
      state.list = mereListById(state.list, action.payload.list) as any
      state.total = action.payload.total
    },
    getListQuestionSuccess2(
      state,
      action: PayloadAction<{list: Question[]; total: number}>
    ) {
      state.loadding = false
      state.list = action.payload.list
      state.total = action.payload.total
    },
    getListQuestionFail(state) {
      state.loadding = false
    },
    getQuestionDetail(state, action: PayloadAction<number>) {
      state.loadding = true
    },
    getQuestionDetailSuccess(state, action: PayloadAction<Question>) {
      state.loadding = false
      state.questionDetail = action.payload
    },
    getQuestionDetailFail(state) {
      state.loadding = false
    },

    deleteQuestion(state, action: PayloadAction<number>) {
      state.loadding = true
    },
    deleteQuestionSuccess(state) {
      state.loadding = false
    },
    deleteQuestionFail(state) {
      state.loadding = false
    },

    createQuestion(
      state,
      action: PayloadAction<{
        formData: FormData
        data: {
          content?: string
          category?: string
          phoneNumber?: string
          type?: string
        }
      }>
    ) {
      state.loadding = true
    },
    createQuestionSuccess(state) {
      state.loadding = false
    },
    createQuestionFail(state) {
      state.loadding = false
    },
    updateQuestion(
      state,
      action: PayloadAction<{
        formData: FormData
        data: {
          id?: number
          content?: string
          category?: string
          phoneNumber?: string
          type?: string
          images?: string[]
          thumbnails?: string[]
        }
      }>
    ) {
      state.loadding = true
    },
    updateQuestionSuccess(state) {
      state.loadding = false
    },
    updateQuestionFail(state) {
      state.loadding = false
    },
    answerQuestion(
      state,
      action: PayloadAction<{id?: number; data: FormData; content?: string}>
    ) {
      state.loadding = true
    },
    answerQuestionSuccess(state) {
      state.loadding = false
    },
    answerQuestionFail(state) {
      state.loadding = false
    },
  },
})

export const requestActions = requestSlice.actions

export const selectListQuestion = (state: RootState) => state.requestReducer.list
export const selectQuestionDetail = (state: RootState) =>
  state.requestReducer.questionDetail
export const selectListQuestionTotal = (state: RootState) => state.requestReducer.total
export const requestReducer = requestSlice.reducer
