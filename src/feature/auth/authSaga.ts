import {PayloadAction} from '@reduxjs/toolkit'
import {NavigateFunction} from 'react-router-dom'
import {call, put, takeEvery} from 'redux-saga/effects'
import {authApi} from '../../apis/authApi'
import {setTokenAxios} from '../../apis/axiosClient'
import {snackBarActions} from '../../components/snackbar/snackbarSlice'
import {ROUTE} from '../../router/routes'
import {LoginType} from '../../types/login.type'
import {exportResults} from '../../utils'
import {authAction} from './authSlice'

function setTokens(params: LoginType) {
  localStorage.setItem('accessToken', params.token.accessToken || '')
  localStorage.setItem('refreshToken', params.token.refreshToken || '')
  localStorage.setItem(
    'expiresInAccessToken',
    params.token.expiresInAccessToken || ''
  )
  localStorage.setItem(
    'expiresInRefreshToken',
    params.token.expiresInRefreshToken || ''
  )
}

function* login(
  action: PayloadAction<{
    data: {user_email: string; user_password: string}
    history: NavigateFunction
  }>
) {
  try {
    const data: LoginType = yield call(authApi.login, action.payload.data)
    setTokens(exportResults(data))
    setTokenAxios()
    yield put(
      snackBarActions.setStateSnackBar({
        content: '잘못된 비밀번호 또는 계정',
        type: 'success',
      })
    )
    action.payload.history(ROUTE.HOME)
  } catch (error: any) {
    yield put(
      snackBarActions.setStateSnackBar({
        content: '잘못된 비밀번호 또는 계정',
        type: 'error',
      })
    )
  }
}

export default function* authSaga() {
  yield takeEvery(authAction.login.type, login)
}
