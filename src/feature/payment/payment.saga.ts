import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeEvery } from 'redux-saga/effects'
import { paymentApi } from '../../apis/paymentApi'
import { snackBarActions } from '../../components/snackbar/snackbarSlice'
import { PaymentListModel, PaymentModel } from '../../types/payment.type'
import { paymentAction } from './payment.slice'

function* createPayment(action: PayloadAction<PaymentModel>) {
  try {
    yield call(paymentApi.createPayment, action.payload)
    yield put(
      snackBarActions.setStateSnackBar({content: 'success', type: 'success'})
    )
  } catch (error) {
    yield put(
      snackBarActions.setStateSnackBar({content: 'error', type: 'error'})
    )
  }
}
function* verifyPhoneNumber(action: PayloadAction<{firebaseIdToken: string}>) {
  try {
    yield call(paymentApi.verifyPhoneNumber, action.payload)
  } catch (error) {
    console.log(error)
  }
}
function* getListPaymentHistory(
  action: PayloadAction<{limit: number; offset: number}>
) {
  try {
    const listPointManagement: {list: PaymentListModel[]; total: number} =
      yield call(paymentApi.getPaymentHistory, action.payload)
    yield put(paymentAction.getListPaymentHistorySuccess(listPointManagement))
  } catch (error) {
    yield put(paymentAction.getListPaymentHistoryFail())
  }
}
function* buyPackage(
  action: PayloadAction<{
    package: string
    numberOfMonths: string
    price: string
  }>
) {
  try {
    yield call(paymentApi.buyPackage, action.payload)
    yield put(
      snackBarActions.setStateSnackBar({content: 'succes', type: 'success'})
    )
  } catch (error) {
    console.log(error)
  }
}

export function* paymentSaga() {
  yield takeEvery(paymentAction.createPayment.type, createPayment)
  yield takeEvery(paymentAction.verifyPhoneNumber.type, verifyPhoneNumber)
  yield takeEvery(
    paymentAction.getListPaymentHistory.type,
    getListPaymentHistory
  )
  yield takeEvery(paymentAction.buyPackage.type, buyPackage)
}
