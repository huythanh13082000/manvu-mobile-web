import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {NavigateFunction} from 'react-router-dom'
import {RootState} from '../../app/store'

interface RegisterAdvertiserState {
  loadding: boolean
  status: boolean
}

const initialState: RegisterAdvertiserState = {
  loadding: false,
  status: false,
}

const registerAdvertiser = createSlice({
  name: 'registerAdvertiser',
  initialState,
  reducers: {
    signUpAdvertiser(
      state,
      action: PayloadAction<{
        data: FormData
        history: NavigateFunction
        user: {username: string; password: string}
      }>
    ) {
      state.loadding = true
    },
    signUpAdvertiserSuccess(state) {
      state.loadding = false
    },
    signUpAdvertiserFail(state) {
      state.loadding = false
    },
    signUpAdvertiserSns(
      state,
      action: PayloadAction<{data: FormData; history: NavigateFunction}>
    ) {
      state.loadding = true
    },
    updateAdvertiser(
      state,
      action: PayloadAction<{form: FormData; history: any}>
    ) {
      state.loadding = true
    },
    updateAdvertiserSuccess(state) {
      state.loadding = false
    },
    updateAdvertiserFail(state) {
      state.loadding = false
    },
    setStatus(state, action: PayloadAction<boolean>) {
      state.status = action.payload
    },
  },
})

export const registerAdvertiserAction = registerAdvertiser.actions

export const registerAdvertiserReducer = registerAdvertiser.reducer
export const selectStatus = (state: RootState) =>
  state.registerAdvertiserReducer.status
