import {PayloadAction} from '@reduxjs/toolkit'
import {call, put, takeEvery} from 'redux-saga/effects'
import {advertiserCampaignApi} from '../../apis/advertiserCampaignApi'
import {campaignApi} from '../../apis/campaignApi'
import {Campaign} from '../../types/campaign.type'
import {ListParams} from '../../types/common.type'
import {campaignActions, campaignState} from './campaign.slice'

function* getListCampaign(action: PayloadAction<ListParams>) {
  try {
    const listCampaign: campaignState = yield call(
      campaignApi.getListCampaign,
      action.payload
    )
    yield put(campaignActions.getListCampaignSuccess(listCampaign))
  } catch (error) {
    yield put(campaignActions.getListCampaignFail)
  }
}

function* getListCampaignSearch(action: PayloadAction<{search: string}>) {
  try {
    const listCampaign: {list: Campaign[]} = yield call(
      campaignApi.getListCampaignSearch,
      action.payload
    )
    yield put(campaignActions.getListCampaignSearchSuccess(listCampaign))
  } catch (error) {
    yield put(campaignActions.getListCampaignSearchFail())
  }
}

function* getListCampaignSort(
  action: PayloadAction<{
    sortDir: string
    limit: number
    tabId?: number
    categoryId?: number
    medias?: string
    tagIds?: string
    sortBy?: string
    areaIds?: string
  }>
) {
  try {
    const listCampaign: {list: Campaign[]} = yield call(
      campaignApi.getListCampaign,
      action.payload
    )
    yield put(campaignActions.getListCampaignSortSuccess(listCampaign.list))
  } catch (error) {
    yield put(campaignActions.getListCampaignSortFail())
  }
}

function* getListCampaignAdvertiserSort(
  action: PayloadAction<{
    sortDir: string
    limit: number
    tabId?: number
    categoryId?: number
    medias?: string
    tagIds?: string
  }>
) {
  try {
    const listCampaign: {list: Campaign[]} = yield call(
      advertiserCampaignApi.getAdvertiserCampaign,
      action.payload
    )
    yield put(
      campaignActions.getListCampaignAdvertiserSortSuccess(listCampaign.list)
    )
  } catch (error) {
    yield put(campaignActions.getListCampaignAdvertiserSortFail())
  }
}

function* getListCampaignAdvertiser(action: PayloadAction<ListParams>) {
  try {
    const listCampaign: campaignState = yield call(
      advertiserCampaignApi.getAdvertiserCampaign,
      action.payload
    )
    yield put(campaignActions.getListCampaignAdvertiserSuccess(listCampaign))
  } catch (error) {
    yield put(campaignActions.getListCampaignAdvertiserFail)
  }
}

export default function* campaignSaga() {
  yield takeEvery(campaignActions.getListCampaign.type, getListCampaign)
  yield takeEvery(
    campaignActions.getListCampaignAdvertiser.type,
    getListCampaignAdvertiser
  )
  yield takeEvery(
    campaignActions.getListCampaignSearch.type,
    getListCampaignSearch
  )
  yield takeEvery(campaignActions.getListCampaignSort.type, getListCampaignSort)
  yield takeEvery(
    campaignActions.getListCampaignAdvertiserSort.type,
    getListCampaignAdvertiserSort
  )
}
