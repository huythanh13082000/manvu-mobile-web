import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { advertiserCampaignApi } from "../../apis/advertiserCampaignApi";
import { hashTagApi } from "../../apis/hashTagApi";
import { placeApi } from "../../apis/placeApi";
import { tabApi } from "../../apis/tabApi";
import { uploadImagesThumbsApi } from "../../apis/uploadImagesThumbsApi";
import { snackBarActions } from "../../components/snackbar/snackbarSlice";
import { Categories } from "../../types/categories.type";
import { CreateCampaign } from "../../types/createCampaign.type";
import { Place } from "../../types/place.type";
import { myCampaignAdvertiserActions } from "../my_campaign_advertiser/myCampaignAdvertiser.slice";
import { createCampaignActions } from "./createCampaign.slice";


function* createCampaign(action: PayloadAction<CreateCampaign>) {
  try {
    let fileUpload: {images?: []; thumbs?: []} = {}
    if (
      action.payload.formData &&
      !action.payload.formData.entries().next().done
    ) {
      fileUpload = yield call(
        uploadImagesThumbsApi.uploadImagesThumbs,
        action.payload.formData
      )
    }
    yield call(advertiserCampaignApi.createCampaign, {
      ...action.payload,
      images: fileUpload.images,
    })
    yield put(createCampaignActions.createCampaignSuccess())
    yield put(
      snackBarActions.setStateSnackBar({
        content: '성공을 창조하다',
        type: 'success',
      })
    )
    yield put(
      myCampaignAdvertiserActions.getAdvertiserCampaignMine({
        type: 'all',
      })
    )
  } catch (error: any) {
    yield put(createCampaignActions.createCampaignFail())
    yield put(
      snackBarActions.setStateSnackBar({
        content: error.response.data.message,
        type: 'error',
      })
    )
  }
}

function* updateCampaign(action: PayloadAction<CreateCampaign>) {
  try {
    let fileUpload: {images?: []; thumbs?: []} = {}
    if (
      action.payload.formData &&
      !action.payload.formData.entries().next().done
    ) {
      fileUpload = yield call(
        uploadImagesThumbsApi.uploadImagesThumbs,
        action.payload.formData
      )
    }
    if (action.payload.images1 && fileUpload.images)
      yield call(advertiserCampaignApi.updateCampaign, {
        ...action.payload,
        images: [...action.payload.images1, ...fileUpload.images],
      })
    else if (action.payload.images1) {
      yield call(advertiserCampaignApi.updateCampaign, {
        ...action.payload,
        images: [...action.payload.images1],
      })
    }
    yield put(createCampaignActions.updateCampaignSuccess())
    yield put(
      snackBarActions.setStateSnackBar({
        content: '성공을 창조하다',
        type: 'success',
      })
    )
    yield put(
      myCampaignAdvertiserActions.getAdvertiserCampaignMine({
        type: 'all',
      })
    )
  } catch (error: any) {
    yield put(createCampaignActions.createCampaignFail())
    yield put(
      snackBarActions.setStateSnackBar({
        content: error.response.data.message,
        type: 'error',
      })
    )
  }
}

function* getListPlace(
  action: PayloadAction<{input: string; language: string; key: string}>
) {
  try {
    const listPlace: {predictions: Place[]} = yield call(
      placeApi.getPlace,
      action.payload
    )
    yield put(createCampaignActions.getListPlaceSuccess(listPlace.predictions))
  } catch (error) {
    yield put(createCampaignActions.getListPlaceFail())
  }
}

function* getListTabId(
  action: PayloadAction<{id?: number; tabId?: number; limit?: string}>
) {
  try {
    const listCategories: {categories: Categories[]} = yield call(
      tabApi.getListTab,
      action.payload
    )
    yield put(
      createCampaignActions.getListTabIdSuccess(listCategories.categories)
    )
  } catch (error) {
    yield put(createCampaignActions.getListTabIdFail())
  }
}
function* getListHashTag(action: PayloadAction<{id: number; text: string}[]>) {
  const listHashTag: {list: {id: number; text: string}[]} = yield call(
    hashTagApi.getListHashTag
  )
  yield put(createCampaignActions.getListHashTagSuccess(listHashTag.list))
}

export default function* createCampaignSaga() {
  yield takeEvery(createCampaignActions.createCampaign.type, createCampaign)
  yield takeEvery(createCampaignActions.updateCampaign.type, updateCampaign)
  yield takeEvery(createCampaignActions.getListHashTag.type, getListHashTag)
  yield takeEvery(createCampaignActions.getListTabId.type, getListTabId)
  yield takeEvery(createCampaignActions.getListPlace.type, getListPlace)
}
