import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeEvery } from 'redux-saga/effects'
import { advertiserCampaignMineApi } from '../../apis/advertiserCampaignMineApi'
import { advertiserCampaignMineCountApi } from '../../apis/advertiserCampaignMineCountApi'
import { CampaignAdvertiser } from '../../types/campaignAdvertiser.type'
import {
  AdvertiserCampaignMineCount,
  myCampaignAdvertiserActions
} from './myCampaignAdvertiser.slice'

function* getAdvertiserCampaignMineCount() {
  try {
    const advertiserCampaignMineCount: AdvertiserCampaignMineCount = yield call(
      advertiserCampaignMineCountApi.getAdvertiserCampaignMineCount
    )
    yield put(
      myCampaignAdvertiserActions.getAdvertiserCampaignMineCountSuccess(
        advertiserCampaignMineCount
      )
    )
  } catch (error) {
    console.log(error)
  }
}

function* getAdvertiserCampaignMine(
  action: PayloadAction<{type: string; medias?: string}>
) {
  try {
    const advertiserCampaignMine: {list: CampaignAdvertiser[],total:number} = yield call(
      advertiserCampaignMineApi.getAdvertiserCampaignMine,
      action.payload
    )
    yield put(
      myCampaignAdvertiserActions.getAdvertiserCampaignMineSuccess(
        advertiserCampaignMine
      )
    )
  } catch (error) {
    console.log(error)
  }
}

export default function* myCampaignAdvertiserSaga() {
  yield takeEvery(
    myCampaignAdvertiserActions.getAdvertiserCampaignMineCount.type,
    getAdvertiserCampaignMineCount
  )
  yield takeEvery(
    myCampaignAdvertiserActions.getAdvertiserCampaignMine.type,
    getAdvertiserCampaignMine
  )
}
