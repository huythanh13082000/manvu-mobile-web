import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import {Campaign} from '../../types/campaign.type'
import {ListParams} from '../../types/common.type'
import {mereListById} from '../../utils'

export interface campaignState {
  list: Array<Campaign>
  loading: boolean
  listSearch?: Campaign[]
  listASC: Campaign[]
  total: number | 0
  offset: number | 0
}

const initialState: campaignState = {
  list: [],
  listASC: [],
  total: 0,
  offset: 0,
  loading: false,
}

const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    getListCampaign(state, action: PayloadAction<ListParams>) {
      state.loading = true
      state.offset = Number(action.payload.offset)
    },
    getListCampaignSuccess(state, action: PayloadAction<campaignState>) {
      state.list = mereListById(state.list, action.payload.list) as any
      state.total = action.payload.total
      state.loading = false
    },
    getListCampaignFail(state, action: PayloadAction<campaignState>) {
      state.loading = false
    },
    getListCampaignSearch(state, action: PayloadAction<{search: string}>) {
      state.loading = false
    },
    getListCampaignSearchSuccess(
      state,
      action: PayloadAction<{list: Campaign[]}>
    ) {
      state.loading = false
      state.listSearch = action.payload.list
    },
    getListCampaignSearchFail(state) {
      state.loading = false
    },
    getListCampaignAdvertiser(state, action: PayloadAction<ListParams>) {
      state.offset = Number(action.payload.offset)
      state.loading = true
    },
    getListCampaignAdvertiserSuccess(
      state,
      action: PayloadAction<campaignState>
    ) {
      state.list = mereListById(state.list, action.payload.list) as any
      state.loading = false
      state.total = action.payload.total
    },
    getListCampaignAdvertiserFail(state) {
      state.loading = false
    },
    getListCampaignSort(
      state,
      action: PayloadAction<{
        sortDir?: string
        limit?: number
        tabId?: number
        categoryId?: number
        offset?: number
        medias?: string
        tagIds?: string
        areaIds?: string
        sortBy?: string
      }>
    ) {
      state.loading = false
      state.offset = Number(action.payload.offset)
    },
    getListCampaignSortSuccess(state, action: PayloadAction<Campaign[]>) {
      state.loading = false
      state.listASC = action.payload
      if (state.offset === 0) {
        state.list = action.payload
      } else state.list = mereListById(state.list, action.payload) as any
    },
    getListCampaignSortFail(state) {
      state.loading = false
    },
    getListCampaignAdvertiserSort(
      state,
      action: PayloadAction<{
        sortDir: string
        limit: number
        tabId?: number
        categoryId?: number
        medias?: string
        tagIds?: string
      }>
    ) {
      state.loading = false
    },
    getListCampaignAdvertiserSortSuccess(
      state,
      action: PayloadAction<Campaign[]>
    ) {
      state.loading = false
      state.listASC = action.payload
    },
    getListCampaignAdvertiserSortFail(state) {
      state.loading = false
    },
  },
})

export const campaignActions = campaignSlice.actions

export const selectListCampaign = (state: RootState) =>
  state.campaignReducer.list
export const selectListCampaignSearch = (state: RootState) =>
  state.campaignReducer.listSearch
export const selectListTopCampaign = (state: RootState) =>
  state.campaignReducer.listASC

export const selectTotal = (state: RootState) => state.campaignReducer.total
export const selectOffset = (state: RootState) => state.campaignReducer.offset

export const campaignReducer = campaignSlice.reducer
