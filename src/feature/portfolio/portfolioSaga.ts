import {PayloadAction} from '@reduxjs/toolkit'
import {NavigateFunction} from 'react-router-dom'
import {call, put, takeEvery} from 'redux-saga/effects'
import {portfolioApi} from '../../apis/portfolioApi'
import {uploadApi} from '../../apis/uploadApi'
import {loadingActions} from '../../components/loading/loadingSlice'
import {snackBarActions} from '../../components/snackbar/snackbarSlice'
import {GetParamsType} from '../../types/getParams.type'
import {PortfolioType} from '../../types/portfolio.type'
import {portfolioAction} from './portfolioSlice'

function* createPortfolio(
  action: PayloadAction<{data: PortfolioType; history: NavigateFunction}>
) {
  try {
    yield put(loadingActions.openLoading())
    const dataImage: {data: string} = yield call(
      uploadApi.uploadImage,
      action.payload.data.logo
    )
    const dataImages: {data: string[]} = yield call(
      uploadApi.uploadImages,
      action.payload.data.images as FormData
    )
    const data: {
      code: number
    } = yield call(portfolioApi.create, {
      ...action.payload.data,
      logo: dataImage.data,
      images: dataImages.data,
    })
    if (data.code === 0) {
      yield put(loadingActions.loadingSuccess())
      yield put(
        snackBarActions.setStateSnackBar({content: 'success', type: 'success'})
      )
      action.payload.history(-1)
    } else {
      yield put(loadingActions.loadingSuccess())
      yield put(
        snackBarActions.setStateSnackBar({content: 'error', type: 'error'})
      )
    }
  } catch (error) {
    console.log(error)
  }
}

function* getPortfolio(action: PayloadAction<GetParamsType>) {
  try {
    const data: {
      code: number
      data: {listPortfolios: PortfolioType[]; total: number}
    } = yield call(portfolioApi.get, action.payload)
    if (data.code === 0) {
      yield put(portfolioAction.getSuccess({data: data.data}))
    } else {
      yield put(
        snackBarActions.setStateSnackBar({content: 'error', type: 'error'})
      )
    }
  } catch (error) {
    console.log(error)
  }
}

function* updatePortfolio(
  action: PayloadAction<{data: PortfolioType; history: NavigateFunction}>
) {
  try {
    let ListImages: any[] = []
    let image: string = action.payload.data.logo
    if (typeof action.payload.data.logo === 'object') {
      const formdataImage = new FormData()
      formdataImage.append('picture', action.payload.data.logo)
      const dataImage: {data: string} = yield call(
        uploadApi.uploadImage,
        formdataImage
      )
      image = dataImage.data
    }
    if (action.payload.data.images) {
      const listIndex: number[] = []
      const images = [...(action.payload.data.images as any[])]
      const formdataImages = new FormData()
      images.forEach((item, index = 0) => {
        if (typeof item === 'object') {
          formdataImages.append('pictures', item)
          listIndex.push(index)
        }
      })
      const dataImages: {data: string[]} = yield call(
        uploadApi.uploadImages,
        formdataImages
      )
      listIndex.forEach((item, index = 0) => {
        images[item] = dataImages.data[index]
      })
      ListImages = [...images]
    }
    yield call(portfolioApi.update, {
      ...action.payload.data,
      logo: image,
      images: ListImages,
    })
    yield put(
      snackBarActions.setStateSnackBar({content: 'success', type: 'success'})
    )
    action.payload.history(-1)
  } catch (error) {
    yield put(
      snackBarActions.setStateSnackBar({content: 'error', type: 'error'})
    )
  }
}

export default function* portfolioSaga() {
  yield takeEvery(portfolioAction.create.type, createPortfolio)
  yield takeEvery(portfolioAction.get.type, getPortfolio)
  yield takeEvery(portfolioAction.update.type, updatePortfolio)
}
