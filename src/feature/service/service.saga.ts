import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeEvery } from 'redux-saga/effects'
import { campaignCategoriesApi } from '../../apis/campaignCategoriesApi'
import { tabApi } from '../../apis/tabApi'
import { Campaign } from '../../types/campaign.type'
import { serviceActions, ServiceState } from './service.slice'

function* getCategories(
  action: PayloadAction<{
    tabId?: number
    categoryId?: number
    limit?: number
  }>
) {
  const listCategories: ServiceState = yield call(
    tabApi.getListTab,
    action.payload
  )
  yield put(serviceActions.getCategoriesSuccess(listCategories))
}
function* getListCampaignService(
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
    areaIds?: string
  }>
) {
  try {
    const listCampaignService: {list: Campaign[]; total: number} = yield call(
      campaignCategoriesApi.getListCampaignCategories,
      {...action.payload, sortDir: 'asc'}
    )
    yield put(
      serviceActions.getListCampaignServiceSuccess({
        ...listCampaignService,
        categoryId: Number(action.payload.categoryId),
        offset: Number(action.payload.offset),
      })
    )
  } catch (error) {
    yield put(serviceActions.getListCampaignServiceFail())
  }
}

export default function* serviceSaga() {
  yield takeEvery(serviceActions.getCategories.type, getCategories)
  yield takeEvery(
    serviceActions.getListCampaignService.type,
    getListCampaignService
  )
}
