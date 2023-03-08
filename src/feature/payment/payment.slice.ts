import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import {PaymentListModel, PaymentModel} from '../../types/payment.type'
import {mereAndSortListById} from '../../utils'

export interface PaymentState {
  loadding: boolean
  listPaymentHistory: PaymentListModel[]
}

const initialState: PaymentState = {
  loadding: true,
  listPaymentHistory: [],
}

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    createPayment(state, action: PayloadAction<PaymentModel>) {
      state.loadding = true
    },
    createPaymentSuccess(state) {
      state.loadding = false
    },
    createPaymentFail(state) {
      state.loadding = false
    },
    verifyPhoneNumber(state, action: PayloadAction<{firebaseIdToken: string}>) {
      console.log(action.payload)
    },
    getListPaymentHistory(
      state,
      action: PayloadAction<{limit: number; offset?: number}>
    ) {
      state.loadding = true
    },
    getListPaymentHistorySuccess(
      state,
      action: PayloadAction<{list: PaymentListModel[]; total: number}>
    ) {
      state.listPaymentHistory = mereAndSortListById(
        state.listPaymentHistory,
        action.payload.list
      ) as any
      state.loadding = false
    },
    getListPaymentHistoryFail(state) {
      state.loadding = false
    },
    buyPackage(
      state,
      action: PayloadAction<{
        package: string
        numberOfMonths: string
        price: string
      }>
    ) {},
  },
})

export const paymentAction = paymentSlice.actions
export const selectListPaymentHistory = (state: RootState) =>
  state.paymentReducer.listPaymentHistory
export const paymentReducer = paymentSlice.reducer
