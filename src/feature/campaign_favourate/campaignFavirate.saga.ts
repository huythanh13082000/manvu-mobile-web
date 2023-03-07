import {PayloadAction} from '@reduxjs/toolkit'
import {call, put, takeEvery} from 'redux-saga/effects'
import {advertiserCampaignApi} from '../../apis/advertiserCampaignApi'
import {campaignApi} from '../../apis/campaignApi'
import { Campaign } from '../../types/campaign.type'
import { ListParams } from '../../types/common.type'
import {homeActions, homeState} from './campaignFavirate.slice'

function* getListCampaign(action: PayloadAction<ListParams>) {
  try {
    const listCampaign: homeState = yield call(
      campaignApi.getListCampaign,
      action.payload
    )
    yield put(homeActions.getListCampaignSuccess(listCampaign))
  } catch (error) {
    yield put(homeActions.getListCampaignFail)
  }
}

function* getListCampaignSearch(action: PayloadAction<{search: string}>) {
  try {
    const listCampaign: {list: Campaign[]} = yield call(
      campaignApi.getListCampaignSearch,
      action.payload
    )
    yield put(homeActions.getListCampaignSearchSuccess(listCampaign))
  } catch (error) {
    yield put(homeActions.getListCampaignSearchFail())
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
    filterLiked?: boolean
    status?: string
  }>
) {
  try {
    const listCampaign: {list: Campaign[]} = yield call(
      campaignApi.getListCampaign,
      action.payload
    )
    yield put(homeActions.getListCampaignSortSuccess(listCampaign.list))
  } catch (error) {
    yield put(homeActions.getListCampaignSortFail())
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
      homeActions.getListCampaignAdvertiserSortSuccess(listCampaign.list)
    )
  } catch (error) {
    yield put(homeActions.getListCampaignAdvertiserSortFail())
  }
}

function* getListCampaignAdvertiser(action: PayloadAction<ListParams>) {
  try {
    const listCampaign: homeState = yield call(
      advertiserCampaignApi.getAdvertiserCampaign,
      action.payload
    )
    yield put(homeActions.getListCampaignAdvertiserSuccess(listCampaign))
  } catch (error) {
    yield put(homeActions.getListCampaignAdvertiserFail)
  }
}

export default function* campaignFavirateSaga() {
  yield takeEvery(homeActions.getListCampaign.type, getListCampaign)
  yield takeEvery(
    homeActions.getListCampaignAdvertiser.type,
    getListCampaignAdvertiser
  )
  yield takeEvery(homeActions.getListCampaignSearch.type, getListCampaignSearch)
  yield takeEvery(homeActions.getListCampaignSort.type, getListCampaignSort)
  yield takeEvery(
    homeActions.getListCampaignAdvertiserSort.type,
    getListCampaignAdvertiserSort
  )
}
