import {PayloadAction} from '@reduxjs/toolkit'
import {call, put, takeEvery} from 'redux-saga/effects'
import {campaignCategoriesApi} from '../../apis/campaignCategoriesApi'
import {tabApi} from '../../apis/tabApi'
import { Campaign } from '../../types/campaign.type'
import {reportersActions, ReportersState} from './reporters.slice'

function* getCategories(
  action: PayloadAction<{
    tabId?: number
    categoryId?: number
    limit?: number
  }>
) {
  const listCategories: ReportersState = yield call(
    tabApi.getListTab,
    action.payload
  )
  yield put(reportersActions.getCategoriesSuccess(listCategories))
}
function* getListCampaignReporters(
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
  const listCampaignReporters: {list: Campaign[]; total: number} = yield call(
    campaignCategoriesApi.getListCampaignCategories,
    action.payload
  )
  yield put(
    reportersActions.getListCampaignReportersSuccess({
      ...listCampaignReporters,
      categoryId: Number(action.payload.categoryId),
      offset: Number(action.payload.offset),
    })
  )
}

export default function* reportersSaga() {
  yield takeEvery(reportersActions.getCategories.type, getCategories)
  yield takeEvery(
    reportersActions.getListCampaignReporters.type,
    getListCampaignReporters
  )
}
