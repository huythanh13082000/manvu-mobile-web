import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import {FaqDetail, TabFaq} from '../../types/faq.type'

interface FaqState {
  listTab: TabFaq[]
  loadding: boolean
  listFaqDetail: FaqDetail[]
}

const initialState: FaqState = {
  listTab: [],
  loadding: false,
  listFaqDetail: [],
}

const faqSlice = createSlice({
  name: 'faqSlice',
  initialState,
  reducers: {
    getListTabFaq(state) {
      state.loadding = true
    },
    getListTabFaqSuccess(state, action: PayloadAction<TabFaq[]>) {
      state.listTab = action.payload
      state.loadding = false
    },
    getListTabFaqFail(state) {
      state.loadding = false
    },
    getListFaqDetail(state, action: PayloadAction<number>) {
      state.loadding = true
    },
    getListFaqDetailSucces(state, action: PayloadAction<FaqDetail[]>) {
      state.listFaqDetail = action.payload
      state.loadding = false
    },
    getListFaqDetailFail(state) {
      state.loadding = false
    },
  },
})

export const faqActions = faqSlice.actions

export const selectListTabFaq = (state: RootState) => state.faqReducer.listTab
export const selectListFaqDetail = (state: RootState) => state.faqReducer.listFaqDetail

export const faqReducer = faqSlice.reducer
