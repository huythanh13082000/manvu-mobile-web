import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import { Campaign } from '../../types/campaign.type'
import { Categories } from '../../types/categories.type'
import {mereListById} from '../../utils'

interface CampaignDetail {
  loading: boolean
  campaign?: Campaign | undefined
  listCampaignRelated: Campaign[]
  offset: number
  total: number
  categorieId: number
  categories: Categories[]
  check: boolean
}
const initialState: CampaignDetail = {
  categories: [],
  loading: false,
  campaign: undefined,
  listCampaignRelated: [],
  offset: 0,
  total: 0,
  categorieId: 0,
  check: false,
}

const campaignDetailSlice = createSlice({
  initialState,
  name: 'campaignDetail',
  reducers: {
    getCampaignDetail(state, action: PayloadAction<number>) {
      state.loading = true
    },
    getCampaignDetailSuccess(state, action: PayloadAction<Campaign>) {
      state.loading = false
      state.campaign = action.payload
    },
    getCampaignDetailFail(state) {
      state.loading = false
    },
    getlistCampaignRelated(
      state,
      action: PayloadAction<{
        tabId?: number
        categoryId?: number
        limit?: number
        offset?: number
        medias?: string
        tagIds?: string
        sortBy?: string
        lat?: number
        lng?: number
      }>
    ) {
      state.loading = true
    },
    getlistCampaignRelatedSuccess(
      state,
      action: PayloadAction<{
        list: Campaign[]
        total: number
        categoryId: number
        offset: number
      }>
    ) {
      state.loading = false
      if (
        state.categorieId === action.payload.categoryId &&
        action.payload.offset !== 0
      ) {
        state.listCampaignRelated = mereListById(
          state.listCampaignRelated,
          action.payload.list
        ) as any
      } else {
        state.listCampaignRelated = action.payload.list
      }
      state.total = action.payload.total
    },
    getlistCampaignRelatedFail(state) {
      state.loading = false
    },
    createRequest(state, action: PayloadAction<number>) {
      state.loading = true
    },
    createRequestSuccess(state) {
      state.loading = false
    },
    createRequestFail(state) {
      state.loading = false
    },
    deleteRequest(state, action: PayloadAction<number>) {
      state.loading = true
    },
    deleteRequestSuccess(state) {
      state.loading = false
    },
    deleteRequestFail(state) {
      state.loading = false
    },
    setCheck(state) {
      state.check = true
    },
  },
})

export const campaignDetailAction = campaignDetailSlice.actions

export const selectcampaignDetail = (state: RootState) =>
  state.campaignDetailReducer.campaign

export const selectTotalListCampaignRelated = (state: RootState) =>
  state.campaignDetailReducer.offset
export const selectOffsetListCampaignRelated = (state: RootState) =>
  state.campaignDetailReducer.offset
export const selectListCampaignRelated = (state: RootState) =>
  state.campaignDetailReducer.listCampaignRelated
export const selectCategoriesListCampaignRelated = (state: RootState) =>
  state.campaignDetailReducer.categories

export const campaignDetailReducer = campaignDetailSlice.reducer
