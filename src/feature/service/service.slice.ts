import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import {Campaign} from '../../types/campaign.type'
import {Categories} from '../../types/categories.type'
import {mereListById} from '../../utils'

export interface ServiceState {
  categories: Categories[]
  loading: boolean
  listCampaignService: Campaign[]
  offset: number
  total: number
  categorieId: number
  scroll: number
}

const initialState: ServiceState = {
  categories: [],
  loading: false,
  listCampaignService: [],
  offset: 0,
  total: 0,
  categorieId: 0,
  scroll: 0,
}

export const serviceSlice = createSlice({
  name: 'serviceSlice',
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
    getCategoriesSuccess(state, action: PayloadAction<ServiceState>) {
      state.categories = action.payload.categories
      state.loading = false
    },
    getCategoriesFail(state) {
      state.loading = false
    },
    getListCampaignService(
      state,
      action: PayloadAction<{
        tabId?: number
        categoryId: number
        limit?: number
        offset?: number
        medias?: string
        tagIds?: string
        sortBy?: string
        lat?: number
        lng?: number
        areaIds?: string
      }>
    ) {
      state.loading = true
      state.offset = Number(action.payload.offset)
      state.categorieId = action.payload.categoryId
    },
    getListCampaignServiceSuccess(
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
        state.listCampaignService = mereListById(
          state.listCampaignService,
          action.payload.list
        ) as any
      } else {
        state.listCampaignService = action.payload.list
      }
      state.total = action.payload.total
    },
    getListCampaignServiceFail(state) {
      state.loading = false
    },
    setScrool(state, action: PayloadAction<number>) {
      state.scroll = action.payload
    },
  },
})
export const serviceActions = serviceSlice.actions

export const selectCategories = (state: RootState) =>
  state.serviceReducer.categories
export const selectListCampaignService = (state: RootState) =>
  state.serviceReducer.listCampaignService
export const selectOffsetService = (state: RootState) =>
  state.serviceReducer.offset

export const selectTotalService = (state: RootState) =>
  state.serviceReducer.total

export const selectScrool = (state: RootState) => state.serviceReducer.scroll

export const serviceReducer = serviceSlice.reducer
