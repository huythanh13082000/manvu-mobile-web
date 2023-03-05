import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import { Campaign } from '../../types/campaign.type'
import { Categories } from '../../types/categories.type'
import {mereListById} from '../../utils'

export interface ReportersState {
  loading: boolean
  listCampaignReporters: Campaign[]
  categories: Categories[]
  offset: number
  total: number
  categorieId: number
}

const initialState: ReportersState = {
  categories: [],
  loading: false,
  listCampaignReporters: [],
  offset: 0,
  total: 0,
  categorieId: 0,
}

export const reportersSlice = createSlice({
  name: 'reportersSlice',
  initialState,
  reducers: {
    getCategories(
      state,
      action: PayloadAction<{
        tabId?: number
        categoryId?: number
        limit?: number
      }>
    ) {
      state.loading = true
    },
    getCategoriesSuccess(state, action: PayloadAction<ReportersState>) {
      state.categories = action.payload.categories
      state.loading = false
    },
    getCategoriesFail(state) {
      state.loading = false
    },
    getListCampaignReporters(
      state,
      action: PayloadAction<{
        tabId?: number
        categoryId: number
        limit?: number
        offset?: number
        medias?: string
        tagIds?: string
        sortBy?: string
        areaIds?: string
      }>
    ) {
      state.loading = true
      state.offset = Number(action.payload.offset)
      state.categorieId = action.payload.categoryId
    },
    getListCampaignReportersSuccess(
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
        state.listCampaignReporters = mereListById(
          state.listCampaignReporters,
          action.payload.list
        ) as any
      } else state.listCampaignReporters = action.payload.list
      state.total = action.payload.total
    },
    getListCampaignServicesFail(state) {
      state.loading = false
    },
  },
})
export const reportersActions = reportersSlice.actions

export const selectCategories = (state: RootState) =>
  state.reportersReducer.categories
export const selectListCampaignReporters = (state: RootState) =>
  state.reportersReducer.listCampaignReporters

export const selectOffsetReporters = (state: RootState) =>
  state.reportersReducer.offset

export const selectTotalReporters = (state: RootState) =>
  state.reportersReducer.total

export const reportersReducer = reportersSlice.reducer
