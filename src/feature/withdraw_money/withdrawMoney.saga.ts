import {PayloadAction} from '@reduxjs/toolkit'
import {NavigateFunction} from 'react-router-dom'
import {call, put, takeEvery} from 'redux-saga/effects'
import {withdrawApi} from '../../apis/withdrawApi'
import {snackBarActions} from '../../components/snackbar/snackbarSlice'
import {ROUTE} from '../../router/routes'
import {WithdrawMoney} from '../../types/withdraw.type'
import {withdrawActions} from '../withdraw/withdraw.slice'
import {withdrawMoneyActions} from './withdrawMoney.slice'

function* createWithdrawMoney(
  action: PayloadAction<{data: WithdrawMoney; history: NavigateFunction}>
) {
  try {
    yield call(withdrawApi.createWithdrawMoney, action.payload.data)
    yield put(
      withdrawActions.getListWithdraw({
        limit: 20,
        offset: 0,
      })
    )
    yield put(
      snackBarActions.setStateSnackBar({
        content: 'success',
        type: 'success',
      })
    )
    action.payload.history(ROUTE.SERVICE_CENTER)
  } catch (error: any) {
    yield put(
      snackBarActions.setStateSnackBar({
        content: error.response.data.message,
        type: 'error',
      })
    )
  }
}
function* updateWithdrawMoney(
  action: PayloadAction<{data: WithdrawMoney; history: NavigateFunction}>
) {
  try {
    yield call(withdrawApi.updateWithdrawMoney, action.payload.data)
    yield put(
      withdrawActions.getListWithdraw({
        limit: 20,
        offset: 0,
      })
    )
    yield put(
      snackBarActions.setStateSnackBar({
        content: 'success',
        type: 'success',
      })
    )
    action.payload.history && action.payload.history(ROUTE.SERVICE_CENTER)
  } catch (error: any) {
    yield put(
      snackBarActions.setStateSnackBar({
        content: error.response.data.message,
        type: 'error',
      })
    )
  }
}

export default function* withdrawMoneySaga() {
  yield takeEvery(
    withdrawMoneyActions.createWithdrawMoney.type,
    createWithdrawMoney
  )
  yield takeEvery(withdrawMoneyActions.update.type, updateWithdrawMoney)
}
