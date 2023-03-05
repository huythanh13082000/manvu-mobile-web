import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import {Campaign} from '../../types/campaign.type'
import {Categories} from '../../types/categories.type'
import {mereListById} from '../../utils'

export interface ServicesState {
  categories: Categories[]
  loading: boolean
  listCampaignServices: Campaign[]
  offset: number
  total: number
  categorieId: number
}

const initialState: ServicesState = {
  categories: [],
  loading: false,
  listCampaignServices: [],
  offset: 0,
  total: 0,
  categorieId: 0,
}

export const servicesSlice = createSlice({
  name: 'servicesSlice',
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
    getCategoriesSuccess(state, action: PayloadAction<ServicesState>) {
      state.categories = action.payload.categories
      state.loading = false
    },
    getCategoriesFail(state) {
      state.loading = false
    },
    getListCampaignServices(
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
    getListCampaignServicesSuccess(
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
        state.listCampaignServices = mereListById(
          state.listCampaignServices,
          action.payload.list
        ) as any
      } else state.listCampaignServices = action.payload.list
      state.total = action.payload.total
    },
    getListCampaignServicesFail(state) {
      state.loading = false
    },
  },
})
export const servicesActions = servicesSlice.actions

export const selectCategories = (state: RootState) =>
  state.servicesReducer.categories
export const selectListCampaignServices = (state: RootState) =>
  state.servicesReducer.listCampaignServices
export const selectOffsetServices = (state: RootState) =>
  state.servicesReducer.offset

export const selectTotalServices = (state: RootState) =>
  state.servicesReducer.total

export const servicesReducer = servicesSlice.reducer
