import {PayloadAction} from '@reduxjs/toolkit'
import {call, put, takeEvery} from 'redux-saga/effects'
import {campaignCategoriesApi} from '../../apis/campaignCategoriesApi'
import {campaignDetailApi} from '../../apis/campaignDetailApi'
import {joinRequestApi} from '../../apis/joinRequestApi'
import {Campaign} from '../../types/campaign.type'
import {myCampaignActions} from '../my_campaign/myCampaign.slice'
import {campaignDetailAction} from './campaignDetail.slice'

function* getCampaignDetail(action: PayloadAction<number>) {
  try {
    const campaignDetail: Campaign = yield call(
      campaignDetailApi.getCampaignDetail,
      action.payload
    )
    yield put(campaignDetailAction.getCampaignDetailSuccess(campaignDetail))
  } catch (error) {
    yield put(campaignDetailAction.getCampaignDetailFail())
  }
}

function* createRequest(action: PayloadAction<number>) {
  try {
    yield call(joinRequestApi.createRequest, action.payload)
    yield put(campaignDetailAction.createRequestSuccess())
    yield put(campaignDetailAction.getCampaignDetail(action.payload))
    yield put(myCampaignActions.getMemberCampaignMineCount())
  } catch (error) {
    yield put(campaignDetailAction.createRequestFail())
  }
}

function* getlistCampaignRelated(
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
  }>
) {
  try {
    const listCampaignRelated: {list: Campaign[]; total: number} = yield call(
      campaignCategoriesApi.getListCampaignCategories,
      action.payload
    )
    yield put(
      campaignDetailAction.getlistCampaignRelatedSuccess({
        ...listCampaignRelated,
        categoryId: Number(action.payload.categoryId),
        offset: Number(action.payload.offset),
      })
    )
  } catch (error) {
    yield put(campaignDetailAction.getlistCampaignRelatedFail())
  }
}

function* deleteRequest(action: PayloadAction<number>) {
  try {
    yield call(joinRequestApi.deleteRequest, action.payload)
    yield put(campaignDetailAction.deleteRequestSuccess())
    yield put(campaignDetailAction.getCampaignDetail(action.payload))
    yield put(myCampaignActions.getMemberCampaignMineCount())
  } catch (error) {
    yield put(campaignDetailAction.deleteRequestFail())
  }
}

export default function* campaignDetailSaga() {
  yield takeEvery(
    campaignDetailAction.getCampaignDetail.type,
    getCampaignDetail
  )
  yield takeEvery(campaignDetailAction.createRequest.type, createRequest)
  yield takeEvery(campaignDetailAction.deleteRequest.type, deleteRequest)
  yield takeEvery(
    campaignDetailAction.getlistCampaignRelated.type,
    getlistCampaignRelated
  )
}
