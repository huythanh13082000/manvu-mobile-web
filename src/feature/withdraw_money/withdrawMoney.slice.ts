import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {NavigateFunction} from 'react-router-dom'
import {RootState} from '../../app/store'
import {WithdrawMoney} from '../../types/withdraw.type'

interface WithdrawMoneyState {
  loadding?: boolean
  message?: string
}

const initialState: WithdrawMoneyState = {
  loadding: false,
}

const withdrawMoneySlice = createSlice({
  name: 'withdrawMoney',
  initialState,
  reducers: {
    createWithdrawMoney(
      state,
      action: PayloadAction<{data: WithdrawMoney; history: NavigateFunction}>
    ) {
      state.loadding = true
    },
    createWithdrawMoneySuccess(
      state,
      action: PayloadAction<WithdrawMoneyState>
    ) {
      state.loadding = false
    },
    createWithdrawMoneyFail(state, action: PayloadAction<WithdrawMoneyState>) {
      state.loadding = false
    },
    update(
      state,
      action: PayloadAction<{data: WithdrawMoney; history?: () => void}>
    ) {},
  },
})

export const withdrawMoneyActions = withdrawMoneySlice.actions

export const selectWithdrawMoney = (state: RootState) =>
  state.withdrawMoneyReducer

export const withdrawMoneyReducer = withdrawMoneySlice.reducer
