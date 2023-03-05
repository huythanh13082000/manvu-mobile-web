import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import {Campaign} from '../../types/campaign.type'
import {Categories} from '../../types/categories.type'
import {mereListById} from '../../utils'

export interface ProductState {
  categories: Categories[]
  loading: boolean
  listCampaignProduct: Campaign[]
  offset: number
  total: number
  categorieId: number
}

const initialState: ProductState = {
  categories: [],
  loading: false,
  listCampaignProduct: [],
  offset: 0,
  total: 0,
  categorieId: 0,
}

export const productSlice = createSlice({
  name: 'productSlice',
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
    getCategoriesSuccess(state, action: PayloadAction<ProductState>) {
      state.categories = action.payload.categories
      state.loading = false
    },
    getCategoriesFail(state) {
      state.loading = false
    },
    getListCampaignProduct(
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
    getListCampaignProductSuccess(
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
        state.listCampaignProduct = mereListById(
          state.listCampaignProduct,
          action.payload.list
        ) as any
      } else state.listCampaignProduct = action.payload.list
      state.total = action.payload.total
    },
    getListCampaignProductFail(state) {
      state.loading = false
    },
  },
})
export const productActions = productSlice.actions

export const selectCategories = (state: RootState) =>
  state.productReducer.categories
export const selectListCampaignProduct = (state: RootState) =>
  state.productReducer.listCampaignProduct

export const selectOffsetProduct = (state: RootState) =>
  state.productReducer.offset

export const selectTotalProduct = (state: RootState) =>
  state.productReducer.total

export const productReducer = productSlice.reducer
