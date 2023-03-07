import {PayloadAction} from '@reduxjs/toolkit'
import {call, put, takeEvery} from 'redux-saga/effects'
import {pointTransactionApi} from '../../apis/pointTransactionApi'
import { PointTransaction } from '../../types/pointTransaction.type';
import {pointTransactionActions} from './pointTransaction.slice'

function* getListPointTransaction(
  action: PayloadAction<{limit: number; offset: number}>
) {
  const listPointTransaction: {list: PointTransaction[]; total: number} =
    yield call(pointTransactionApi.getPointTransaction, action.payload)
  yield put(
    pointTransactionActions.getPointTransactionSuccess(listPointTransaction)
  )
}

export default function* PointTransactionSaga() {
  yield takeEvery(
    pointTransactionActions.getPointTransaction.type,
    getListPointTransaction
  )
}
