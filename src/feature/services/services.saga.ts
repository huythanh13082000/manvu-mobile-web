import {PayloadAction} from '@reduxjs/toolkit'
import {call, put, takeEvery} from 'redux-saga/effects'
import {campaignCategoriesApi} from '../../apis/campaignCategoriesApi'
import {tabApi} from '../../apis/tabApi'
import {Campaign} from '../../types/campaign.type'
import {servicesActions, ServicesState} from './services.slice'

function* getCategories(
  action: PayloadAction<{
    tabId?: number
    categoryId?: number
    limit?: number
  }>
) {
  const listCategories: ServicesState = yield call(
    tabApi.getListTab,
    action.payload
  )
  yield put(servicesActions.getCategoriesSuccess(listCategories))
}
function* getListCampaignServices(
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
  const listCampaignServices: {list: Campaign[]; total: number} = yield call(
    campaignCategoriesApi.getListCampaignCategories,
    action.payload
  )
  yield put(
    servicesActions.getListCampaignServicesSuccess({
      ...listCampaignServices,
      categoryId: Number(action.payload.categoryId),
      offset: Number(action.payload.offset),
    })
  )
}

export default function* servicesSaga() {
  yield takeEvery(servicesActions.getCategories.type, getCategories)
  yield takeEvery(
    servicesActions.getListCampaignServices.type,
    getListCampaignServices
  )
}
