import {PayloadAction} from '@reduxjs/toolkit'
import {call, put, takeEvery} from 'redux-saga/effects'
import {advertiserLikePostApi} from '../../apis/advertiserLikePostApi'
import {campaignApi} from '../../apis/campaignApi'
import {replyRequestApi} from '../../apis/replyRequestApi'
import { campaignDetailAction } from '../campaign_detail/campaignDetail.slice'
import {cardChannelActions} from './cardChannel.slice'

function* replyRequest(
  action: PayloadAction<{id: number; status: number; campaignId: number}>
) {
  try {
    yield call(replyRequestApi.replyRequest, action.payload)
    yield put(cardChannelActions.replyRequestSuccess())
    yield put(campaignDetailAction.getCampaignDetail(action.payload.campaignId))
  } catch (error) {
    yield put(cardChannelActions.replyRequestFail())
  }
}
function* postCampaignStatus(
  action: PayloadAction<{
    id: number
    idPost: number
    status: number
    review: string
  }>
) {
  try {
    yield call(campaignApi.campaignPostStatus, action.payload)
    yield put(campaignDetailAction.getCampaignDetail(action.payload.id))
  } catch (error) {
    yield put(cardChannelActions.replyRequestFail())
  }
}
function* advertiserLikePost(action: PayloadAction<number>) {
  try {
    yield call(advertiserLikePostApi.advertiserLikePost, action.payload)
  } catch (error) {
    console.log(error)
  }
}
function* advertiserUnLikePost(action: PayloadAction<number>) {
  try {
    yield call(advertiserLikePostApi.advertiserUnLikePost, action.payload)
  } catch (error) {
    console.log(error)
  }
}

export default function* cardChannelSaga() {
  yield takeEvery(cardChannelActions.replyRequest.type, replyRequest)
  yield takeEvery(
    cardChannelActions.postCampaignStatus.type,
    postCampaignStatus
  )
  yield takeEvery(
    cardChannelActions.advertiserLikePost.type,
    advertiserLikePost
  )
  yield takeEvery(
    cardChannelActions.advertiserUnLikePost.type,
    advertiserUnLikePost
  )
}
