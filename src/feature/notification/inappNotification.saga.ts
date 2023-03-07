import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeEvery } from 'redux-saga/effects'
import { inappNotificationApi } from '../../apis/inappNotificationApi'
import { InappNotification } from '../../types/InappNotification.type';
import { inappNotificationActions } from './inappNotificationSlice'

function* getListInappNotification(
  action: PayloadAction<{limit: number; offset: number}>
) {
  try {
    const listInappNotification: {list: InappNotification[]; total: number} =
      yield call(inappNotificationApi.getInappNotification, action.payload)
    yield put(
      inappNotificationActions.getInappNotificationSuccess(
        listInappNotification
      )
    )
    yield put(inappNotificationActions.getInappNotificationCountUnread())
  } catch (error) {
    yield put(inappNotificationActions.getInappNotificationFail())
  }
}
function* getListInappNotification2(
  action: PayloadAction<{limit: number; offset: number}>
) {
  try {
    const listInappNotification: {list: InappNotification[]; total: number} =
      yield call(inappNotificationApi.getInappNotification, action.payload)
    yield put(
      inappNotificationActions.getInappNotificationSuccess2(
        listInappNotification
      )
    )
  } catch (error) {
    yield put(inappNotificationActions.getInappNotificationFail())
  }
}

function* deleteInappNotification(action: PayloadAction<number>) {
  try {
    yield call(inappNotificationApi.deleteInappNotification, action.payload)
    yield put(inappNotificationActions.deleteInappNotificationSuccess())
    yield put(inappNotificationActions.getInappNotification2({limit: 50}))
    yield put(inappNotificationActions.getInappNotificationCountUnread())
  } catch (error) {
    yield put(inappNotificationActions.deleteInappNotificationFail())
  }
}
function* getCountInappNotificationUnread() {
  try {
    const countUnread: {count: number} = yield call(
      inappNotificationApi.getInappNotificationCountUnread
    )
    yield put(
      inappNotificationActions.getInappNotificationCountUnreadSuccess(
        countUnread.count
      )
    )
  } catch (error) {
    yield put(inappNotificationActions.getInappNotificationCountUnreadFail())
  }
}
function* updateInappNotification(
  action: PayloadAction<{id: number; status: number}>
) {
  try {
    yield call(inappNotificationApi.updateInappNotification, action.payload)
    yield put(inappNotificationActions.updateInappNotificationSuccess())
    yield put(inappNotificationActions.getInappNotification2({limit: 50}))
    yield put(inappNotificationActions.getInappNotificationCountUnread())
  } catch (error) {
    yield put(inappNotificationActions.updateInappNotificationFail())
  }
}

export default function* inappNotificationSaga() {
  yield takeEvery(
    inappNotificationActions.getInappNotification.type,
    getListInappNotification
  )
  yield takeEvery(
    inappNotificationActions.getInappNotification2.type,
    getListInappNotification2
  )
  yield takeEvery(
    inappNotificationActions.deleteInappNotification.type,
    deleteInappNotification
  )
  yield takeEvery(
    inappNotificationActions.getInappNotificationCountUnread.type,
    getCountInappNotificationUnread
  )
  yield takeEvery(
    inappNotificationActions.updateInappNotification.type,
    updateInappNotification
  )
}
