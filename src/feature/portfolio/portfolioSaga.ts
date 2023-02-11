import {PayloadAction} from '@reduxjs/toolkit'
import {NavigateFunction} from 'react-router-dom'
import {call, put, takeEvery} from 'redux-saga/effects'
import {portfolioApi} from '../../apis/portfolioApi'
import {uploadApi} from '../../apis/uploadApi'
import {snackBarActions} from '../../components/snackbar/snackbarSlice'
import {PortfolioType} from '../../types/portfolio.type'
import {portfolioAction} from './portfolioSlice'

function* createPortfolio(
  action: PayloadAction<{data: PortfolioType; history: NavigateFunction}>
) {
  try {
    const dataImage: {data: string} = yield call(
      uploadApi.uploadImage,
      action.payload.data.logo
    )
    const dataImages: {data: string[]} = yield call(
      uploadApi.uploadImages,
      action.payload.data.images as FormData
    )
    yield call(portfolioApi.create, {
      ...action.payload.data,
      logo: dataImage.data,
      images: dataImages.data,
    })
    yield put(
      snackBarActions.setStateSnackBar({content: 'success', type: 'success'})
    )
    action.payload.history(-1)
  } catch (error) {
    yield put(
      snackBarActions.setStateSnackBar({content: 'error', type: 'error'})
    )
    console.log(error)
  }
}

export default function* portfolioSaga() {
  yield takeEvery(portfolioAction.create.type, createPortfolio)
}
