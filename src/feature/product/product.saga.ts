import {PayloadAction} from '@reduxjs/toolkit'
import {call, put, takeEvery} from 'redux-saga/effects'
import {campaignCategoriesApi} from '../../apis/campaignCategoriesApi'
import {tabApi} from '../../apis/tabApi'
import {Campaign} from '../../types/campaign.type'
import {productActions, ProductState} from './product.slice'

function* getCategories(
  action: PayloadAction<{
    tabId?: number
    categoryId?: number
    limit?: number
  }>
) {
  const listCategories: ProductState = yield call(
    tabApi.getListTab,
    action.payload
  )
  yield put(productActions.getCategoriesSuccess(listCategories))
}
function* getListCampaignProduct(
  action: PayloadAction<{
    tabId?: number
    categoryId?: number
    limit?: number
    offset?: number
    medias?: string
    tagIds?: string
    sortBy?: string
    areaIds?: string
  }>
) {
  const listCampaignProduct: {list: Campaign[]; total: number} = yield call(
    campaignCategoriesApi.getListCampaignCategories,
    action.payload
  )
  yield put(
    productActions.getListCampaignProductSuccess({
      ...listCampaignProduct,
      categoryId: Number(action.payload.categoryId),
      offset: Number(action.payload.offset),
    })
  )
}

export default function* productSaga() {
  yield takeEvery(productActions.getCategories.type, getCategories)
  yield takeEvery(
    productActions.getListCampaignProduct.type,
    getListCampaignProduct
  )
}
