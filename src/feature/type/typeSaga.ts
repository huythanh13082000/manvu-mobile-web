import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeEvery } from 'redux-saga/effects'
import { typeApi } from '../../apis/typeApi'
import { snackBarActions } from '../../components/snackbar/snackbarSlice'
import { GetParamsType } from '../../types/getParams.type'
import { TypeType } from '../../types/type.type'
import { typeAction } from './typeSlice'

function* createType(action: PayloadAction<{data: TypeType; setOpen: Function}>) {
  try {
    const data: {
      code: number
    } = yield call(typeApi.create, {
      ...action.payload.data,
    })
    if (data.code === 0) {
      yield action.payload.setOpen()
      yield put(
        snackBarActions.setStateSnackBar({content: 'success', type: 'success'})
      )
    } else {
      yield put(
        snackBarActions.setStateSnackBar({content: 'error', type: 'error'})
      )
    }
  } catch (error) {
    console.log(error)
    yield put(
      snackBarActions.setStateSnackBar({content: 'error', type: 'error'})
    )
  }
}
function* updateType(action: PayloadAction<{data: TypeType; setOpen: Function}>) {
  try {
    const data: {
      code: number
    } = yield call(typeApi.update, {
      ...action.payload.data,
    })
    if (data.code === 0) {
      yield action.payload.setOpen()
      yield put(
        snackBarActions.setStateSnackBar({content: 'success', type: 'success'})
      )
    } else {
      yield put(
        snackBarActions.setStateSnackBar({content: 'err', type: 'error'})
      )
    }
  } catch (error) {
    console.log(error)
  }
}

function* getType(action: PayloadAction<GetParamsType>) {
  try {
    const data: {
      code: number
      data: {listTypes: TypeType[]; total: number}
    } = yield call(typeApi.get, action.payload)
    if (data.code === 0) {
      yield put(typeAction.getSuccess({data: data.data}))
    } else {
      yield put(
        snackBarActions.setStateSnackBar({content: 'error', type: 'error'})
      )
    }
  } catch (error) {
    console.log(error)
  }
}

export function* typeSaga() {
  yield takeEvery(typeAction.create.type, createType)
  yield takeEvery(typeAction.get.type, getType)
  yield takeEvery(typeAction.update.type, updateType)
}
