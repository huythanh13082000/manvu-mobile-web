import {PayloadAction} from '@reduxjs/toolkit'
import {NavigateFunction} from 'react-router-dom'
import {call, put, takeEvery} from 'redux-saga/effects'
import {orderProjectApi} from '../../apis/orderProjectApi'
import {snackBarActions} from '../../components/snackbar/snackbarSlice'
import {GetParamsType} from '../../types/getParams.type'
import {OrderProjectType} from '../../types/orderProject.type'
import {orderProjectAction} from './orderProjectSlice'

export function* getOrderProject(action: PayloadAction<GetParamsType>) {
  try {
    const data: {
      code: number
      data: {listOrder: OrderProjectType[]; total: number}
    } = yield call(orderProjectApi.get, action.payload)
    if (data.code === 0) {
      yield put(orderProjectAction.getSuccess({data: data.data}))
    } else {
      yield put(
        snackBarActions.setStateSnackBar({content: 'error', type: 'error'})
      )
    }
  } catch (error) {
    console.log(error)
  }
}

function* updateOrderProject(
  action: PayloadAction<{data: OrderProjectType; history: NavigateFunction}>
) {
  try {
    const data: {
      code: number
    } = yield call(orderProjectApi.update, {
      ...action.payload.data,
    })
    if (data.code === 0) {
      yield put(
        snackBarActions.setStateSnackBar({content: 'success', type: 'success'})
      )
      action.payload.history(-1)
    } else {
      yield put(
        snackBarActions.setStateSnackBar({content: 'error', type: 'error'})
      )
    }
  } catch (error) {
    console.log(error)
  }
}

export default function* orderProjectSaga() {
  yield takeEvery(orderProjectAction.get.type, getOrderProject)
  yield takeEvery(orderProjectAction.update.type, updateOrderProject)
}
