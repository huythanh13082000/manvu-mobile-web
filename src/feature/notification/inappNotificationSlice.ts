import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import {InappNotification} from '../../types/InappNotification.type'
import {mereListById} from '../../utils'

interface inappNotificationState {
  loadding?: boolean
  listInappNotification: InappNotification[]
  countUnread?: number
  total: number
}

const initialState: inappNotificationState = {
  total: 0,
  listInappNotification: [],
}

const inappNotificationSlice = createSlice({
  name: 'inappNotification',
  initialState,
  reducers: {
    getInappNotification(
      state,
      action: PayloadAction<{limit: number; offset?: number}>
    ) {
      state.loadding = true
    },

    getInappNotificationSuccess(
      state,
      action: PayloadAction<{list: InappNotification[]; total: number}>
    ) {
      state.listInappNotification = mereListById(
        state.listInappNotification,
        action.payload.list
      ) as any
      // state.listInappNotification = action.payload.list
      state.loadding = false
      state.total = action.payload.total
    },
    getInappNotification2(
      state,
      action: PayloadAction<{limit: number; offset?: number}>
    ) {
      state.loadding = true
    },
    getInappNotificationSuccess2(
      state,
      action: PayloadAction<{list: InappNotification[]; total: number}>
    ) {
      // state.listInappNotification = mereListById(
      //   state.listInappNotification,
      //   action.payload.list
      // ) as any
      state.listInappNotification = action.payload.list
      state.loadding = false
      state.total = action.payload.total
    },
    getInappNotificationFail(state) {
      state.loadding = false
    },
    getInappNotificationCountUnread(state) {
      state.loadding = true
    },
    getInappNotificationCountUnreadSuccess(
      state,
      action: PayloadAction<number>
    ) {
      state.loadding = false
      state.countUnread = action.payload
    },
    getInappNotificationCountUnreadFail(state) {
      state.loadding = false
    },
    deleteInappNotification(state, action: PayloadAction<number>) {
      state.loadding = true
    },
    deleteInappNotificationSuccess(state) {
      state.loadding = false
    },
    deleteInappNotificationFail(state) {
      state.loadding = false
    },
    updateInappNotification(
      state,
      action: PayloadAction<{id: number; status: number}>
    ) {
      state.loadding = true
    },
    updateInappNotificationSuccess(state) {
      state.loadding = false
    },
    updateInappNotificationFail(state) {
      state.loadding = false
    },
  },
})

export const inappNotificationActions = inappNotificationSlice.actions

export const selectListInappNotification = (state: RootState) =>
  state.inappNotificationReducer.listInappNotification

export const selectListInappNotificationTotal = (state: RootState) =>
  state.inappNotificationReducer.total

export const selectInappNotificationCountUnread = (state: RootState) =>
  state.inappNotificationReducer.countUnread
export const inappNotificationReducer = inappNotificationSlice.reducer
