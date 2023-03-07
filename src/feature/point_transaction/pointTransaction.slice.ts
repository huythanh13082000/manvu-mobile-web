import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import {PointTransaction} from '../../types/pointTransaction.type'
import {mereListById} from '../../utils'

interface PointTransactionState {
  loadding?: boolean
  list: PointTransaction[]
  total: number
}

const initialState: PointTransactionState = {
  loadding: false,
  list: [],
  total: 0,
}
const pointTransactionSlice = createSlice({
  name: 'PointTransaction',
  initialState,
  reducers: {
    getPointTransaction(
      state,
      action: PayloadAction<{limit: number; offset?: number}>
    ) {
      state.loadding = true
    },
    getPointTransactionSuccess(
      state,
      action: PayloadAction<{list: PointTransaction[]; total: number}>
    ) {
      state.list = mereListById(state.list, action.payload.list) as any
      state.loadding = false
      state.total = action.payload.total
    },
    getPointTransactionFail(state) {
      state.loadding = false
    },
  },
})

export const pointTransactionActions = pointTransactionSlice.actions

export const selectListPointTransaction = (state: RootState) =>
  state.pointTransactionReducer.list

export const selectListPointTotal = (state: RootState) =>
  state.pointTransactionReducer.total

export const pointTransactionReducer = pointTransactionSlice.reducer
