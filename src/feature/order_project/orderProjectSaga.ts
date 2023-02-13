import {PayloadAction} from '@reduxjs/toolkit'
import {call, put, takeEvery} from 'redux-saga/effects'
import {orderProjectApi} from '../../apis/orderProjectApi'
import {snackBarActions} from '../../components/snackbar/snackbarSlice'
import {GetParamsType} from '../../types/getParams.type'
import {OrderProjectType} from '../../types/orderProject.type'
import {orderProjectAction} from './orderProjectSlice'

export function* getOrderProject(action: PayloadAction<GetParamsType>) {
  try {
    const data: {data: {listOrder: OrderProjectType[]; total: number}} =
      yield call(orderProjectApi.get, action.payload)
    yield put(orderProjectAction.getSuccess({data: data.data}))
  } catch (error) {
    yield put(
      snackBarActions.setStateSnackBar({content: 'error', type: 'error'})
    )
  }
}

export default function* orderProjectSaga() {
  yield takeEvery(orderProjectAction.get.type, getOrderProject)
}
