import {PayloadAction} from '@reduxjs/toolkit'
import {call, put, takeEvery} from 'redux-saga/effects'
import {withdrawApi} from '../../apis/withdrawApi'
import { Withdraw } from '../../types/withdraw.type';
import {withdrawActions} from './withdraw.slice'

function* getListWithdraw(
  action: PayloadAction<{limit: number; offset: number}>
) {
  const listWithdraw: {list: Withdraw[]; total: number} = yield call(
    withdrawApi.getListWithdraw,
    action.payload
  )
  yield put(
    withdrawActions.getListWithdrawSuccess({
      ...listWithdraw,
      offset: action.payload.offset,
    })
  )
}

export default function* withdrawSaga() {
  yield takeEvery(withdrawActions.getListWithdraw.type, getListWithdraw)
}
