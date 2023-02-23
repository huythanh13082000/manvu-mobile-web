import {PayloadAction} from '@reduxjs/toolkit'
import {call, put, takeEvery} from 'redux-saga/effects'
import {optionApi} from '../../apis/optionApi'
import {uploadApi} from '../../apis/uploadApi'
import {loadingActions} from '../../components/loading/loadingSlice'
import {snackBarActions} from '../../components/snackbar/snackbarSlice'
import {GetParamsType} from '../../types/getParams.type'
import {OptionType} from '../../types/option.type'
import {optionAction} from './optionSlice'

function* createOption(
  action: PayloadAction<{data: OptionType; setOpen: Function}>
) {
  try {
    const formData = new FormData()
    formData.append('picture', action.payload.data.image as File)
    const dataImage: {data: string} = yield call(
      uploadApi.uploadImage,
      formData
    )
    const data: {
      code: number
    } = yield call(optionApi.create, {
      ...action.payload.data,
      image: dataImage.data,
    })
    if (data.code === 0) {
      yield action.payload.setOpen()
      yield put(loadingActions.loadingSuccess())
      yield put(
        snackBarActions.setStateSnackBar({content: 'success', type: 'success'})
      )
    } else {
      yield put(loadingActions.loadingSuccess())
      yield put(
        snackBarActions.setStateSnackBar({content: 'err', type: 'error'})
      )
    }
  } catch (error) {
    console.log(error)
  }
}
function* updateOption(
  action: PayloadAction<{data: OptionType; setOpen: Function}>
) {
  try {
    const formData = new FormData()
    formData.append('picture', action.payload.data.image as File)
    const dataImage: {data: string} = yield call(
      uploadApi.uploadImage,
      formData
    )
    const data: {
      code: number
    } = yield call(optionApi.update, {
      ...action.payload.data,
      image: dataImage.data,
    })
    if (data.code === 0) {
      yield put(loadingActions.loadingSuccess())
      yield action.payload.setOpen()
      yield put(
        snackBarActions.setStateSnackBar({content: 'success', type: 'success'})
      )
    } else {
      yield put(loadingActions.loadingSuccess())
      yield put(
        snackBarActions.setStateSnackBar({content: 'err', type: 'error'})
      )
    }
  } catch (error) {
    console.log(error)
  }
}

function* getListOption(action: PayloadAction<GetParamsType>) {
  try {
    const data: {
      code: number
      data: {listOption: OptionType[]; total: number}
    } = yield call(optionApi.get, action.payload)
    if (data.code === 0) {
      yield put(optionAction.getSuccess({data: data.data}))
    } else {
      yield put(
        snackBarActions.setStateSnackBar({content: 'error', type: 'error'})
      )
    }
  } catch (error) {
    console.log(error)
  }
}

export function* optionSaga() {
  yield takeEvery(optionAction.create.type, createOption)
  yield takeEvery(optionAction.get.type, getListOption)
  yield takeEvery(optionAction.update.type, updateOption)
}
