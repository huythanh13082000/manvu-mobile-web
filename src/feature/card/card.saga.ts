import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeEvery } from 'redux-saga/effects'
import { campaignApi } from '../../apis/campaignApi'
import { campaignLikeApi } from '../../apis/campaignLikeApi'
import { snackBarActions } from '../../components/snackbar/snackbarSlice'
import { myCampaignActions } from '../my_campaign/myCampaign.slice'
import { cardActions } from './card.slice'

function* postMemberCampaignLike(action: PayloadAction<number>) {
  try {
    yield call(campaignLikeApi.postMemberCampaignLike, action.payload)
  } catch (error) {
    console.log(error)
  }
}
function* postReviewCampaign(
  action: PayloadAction<{id: number; url: string; type?: string}>
) {
  try {
    yield call(campaignApi.campaignPost, action.payload)
    yield put(
      snackBarActions.setStateSnackBar({content: 'success', type: 'success'})
    )
    yield put(myCampaignActions.getMemberCampaignMineCount())
    if (action.payload.type)
      yield put(
        myCampaignActions.getMemberCampaignMine({type: action.payload.type})
      )
  } catch (error) {
    yield put(
      snackBarActions.setStateSnackBar({content: 'error', type: 'error'})
    )
    console.log(error)
  }
}
function* updateReviewCampaign(
  action: PayloadAction<{id: number; url: string; type?: string}>
) {
  try {
    yield call(campaignApi.campaignUpdate, action.payload)
    yield put(
      snackBarActions.setStateSnackBar({content: 'success', type: 'success'})
    )
    yield put(myCampaignActions.getMemberCampaignMineCount())
    if (action.payload.type)
      yield put(
        myCampaignActions.getMemberCampaignMine({type: action.payload.type})
      )
  } catch (error) {
    yield put(
      snackBarActions.setStateSnackBar({content: 'error', type: 'error'})
    )
    console.log(error)
  }
}
function* postMemberCampaignUnLike(action: PayloadAction<number>) {
  try {
    yield call(campaignLikeApi.postMemberCampaignUnLike, action.payload)
  } catch (error) {
    console.log(error)
  }
}
function* postAdvertiserCampaignLike(action: PayloadAction<number>) {
  try {
    yield call(campaignLikeApi.postAdvertiserCampaignLike, action.payload)
  } catch (error) {
    console.log(error)
  }
}
function* postAdvertiserCampaignUnLike(action: PayloadAction<number>) {
  try {
    yield call(campaignLikeApi.postAdvertiserCampaignUnLike, action.payload)
  } catch (error) {
    console.log(error)
  }
}

export default function* cardSaga() {
  yield takeEvery(
    cardActions.postMemberCampaignLike.type,
    postMemberCampaignLike
  )
  yield takeEvery(
    cardActions.postMemberCampaignUnLike.type,
    postMemberCampaignUnLike
  )
  yield takeEvery(
    cardActions.postAdvertiserCampaignLike.type,
    postAdvertiserCampaignLike
  )
  yield takeEvery(
    cardActions.postAdvertiserCampaignUnLike.type,
    postAdvertiserCampaignUnLike
  )
  yield takeEvery(cardActions.postReviewCampaign.type, postReviewCampaign)
  yield takeEvery(cardActions.updateReviewCampaign.type, updateReviewCampaign)
}
