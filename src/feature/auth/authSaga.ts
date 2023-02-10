import {PayloadAction} from '@reduxjs/toolkit'
import {call, takeEvery} from 'redux-saga/effects'
import {authApi} from '../../apis/authApi'
import {LoginType} from '../../types/login.type'
import {authAction} from './authSlice'

function* login(
  action: PayloadAction<{user_email: string; user_password: string}>
) {
  try {
    console.log(action.payload)
    const data: LoginType = yield call(authApi.login, action.payload)
    console.log(data)
  } catch (error: any) {
    console.log(1221, error)
  }
}

export default function* authSaga() {
  yield takeEvery(authAction.login.type, login)
}
