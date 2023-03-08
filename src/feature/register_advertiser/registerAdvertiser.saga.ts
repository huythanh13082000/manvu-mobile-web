import {PayloadAction} from '@reduxjs/toolkit'
import {NavigateFunction} from 'react-router-dom'
import {call, put, takeEvery} from 'redux-saga/effects'
import {signUpApi} from '../../apis/signUpApi'
import {userApi} from '../../apis/userApi'
import {snackBarActions} from '../../components/snackbar/snackbarSlice'
import {ROUTE} from '../../router/routes'
import {authActions} from '../auth/auth.slice'
import {userActions} from '../user/user.slice'
import {registerAdvertiserAction} from './registerAdvertiser.slice'

function* registerAdvertiser(
  action: PayloadAction<{
    data: FormData
    history: NavigateFunction
    user: {username: string; password: string}
  }>
) {
  try {
    yield call(signUpApi.signUpAdvertiser, action.payload.data)
    yield put(registerAdvertiserAction.signUpAdvertiserSuccess())
    yield put(
      snackBarActions.setStateSnackBar({type: 'success', content: 'success'})
    )
    yield put(authActions.login(action.payload.user))
    yield action.payload.history(ROUTE.HOME)
  } catch (error: any) {
    yield put(registerAdvertiserAction.signUpAdvertiserFail())
    yield put(
      snackBarActions.setStateSnackBar({
        type: 'error',
        content: error.response.data.message,
      })
    )
  }
}

function* signUpAdvertiserSns(
  action: PayloadAction<{data: FormData; history: NavigateFunction}>
) {
  try {
    yield call(signUpApi.signUpAdvertiserSns, action.payload.data)
    yield put(registerAdvertiserAction.signUpAdvertiserSuccess())
    yield put(
      snackBarActions.setStateSnackBar({type: 'success', content: 'success'})
    )
    yield put(registerAdvertiserAction.setStatus(true))
    action.payload.history(ROUTE.LOGIN)
  } catch (error: any) {
    yield put(registerAdvertiserAction.signUpAdvertiserFail())
    yield put(
      snackBarActions.setStateSnackBar({
        type: 'error',
        content: error.response.data.message,
      })
    )
  }
}

function* updateAdvetiser(
  action: PayloadAction<{form: FormData; history: any}>
) {
  try {
    yield call(userApi.updateProfile, action.payload.form)
    yield put(registerAdvertiserAction.updateAdvertiserSuccess())
    action.payload.history(-1)
    yield put(
      snackBarActions.setStateSnackBar({type: 'success', content: 'success'})
    )
    yield put(userActions.getProfile())
  } catch (error: any) {
    yield put(registerAdvertiserAction.updateAdvertiserFail())
    yield put(
      snackBarActions.setStateSnackBar({
        type: 'error',
        content: error.response.data.message,
      })
    )
  }
}
export default function* registerAdvertiserSaga() {
  yield takeEvery(
    registerAdvertiserAction.signUpAdvertiser.type,
    registerAdvertiser
  )
  yield takeEvery(
    registerAdvertiserAction.updateAdvertiser.type,
    updateAdvetiser
  )
  yield takeEvery(
    registerAdvertiserAction.signUpAdvertiserSns.type,
    signUpAdvertiserSns
  )
}
