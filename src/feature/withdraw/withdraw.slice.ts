import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import { Withdraw } from '../../types/withdraw.type'
import {mereListById} from '../../utils'

export interface withdrawState {
  loadding: boolean
  list: Withdraw[]
  total: number
}

const initialState: withdrawState = {
  loadding: false,
  list: [],
  total: 0,
}

const withdrawSlice = createSlice({
  name: 'withdraw',
  initialState,
  reducers: {
    getListWithdraw(
      state,
      action: PayloadAction<{limit: number; offset: number}>
    ) {
      state.loadding = true
    },
    getListWithdrawSuccess(
      state,
      action: PayloadAction<{list: Withdraw[]; total: number; offset: number}>
    ) {
      state.loadding = false

      if (action.payload.offset === 0) {
        state.list = action.payload.list
      } else {
        state.list = mereListById(state.list, action.payload.list) as any
      }

      // state.list = action.payload.list
      state.total = action.payload.total
    },
    getListWithdrawFail(state) {
      state.loadding = false
    },
  },
})

export const withdrawActions = withdrawSlice.actions

export const selectListWithdraw = (state: RootState) => state.withdrawReducer.list
export const selectListWithdrawTotal = (state: RootState) =>
  state.withdrawReducer.total

export const withdrawReducer = withdrawSlice.reducer
