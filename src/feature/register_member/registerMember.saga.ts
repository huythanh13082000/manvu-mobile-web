import {PayloadAction} from '@reduxjs/toolkit'
import {NavigateFunction} from 'react-router-dom'
import {call, put, takeEvery} from 'redux-saga/effects'
import {signUpApi} from '../../apis/signUpApi'
import {userApi} from '../../apis/userApi'
import {snackBarActions} from '../../components/snackbar/snackbarSlice'
import {ROUTE} from '../../router/routes'
import {authActions} from '../auth/auth.slice'
import {userActions} from '../user/user.slice'
import {registerMemberAction} from './registerMember.slice'

function* registermember(
  action: PayloadAction<{
    data: FormData
    history: NavigateFunction
    user: {username: string; password: string}
  }>
) {
  try {
    yield call(signUpApi.signUpMember, action.payload.data)
    yield put(registerMemberAction.signUpMemberSuccess())
    yield put(authActions.login(action.payload.user))
    yield put(
      snackBarActions.setStateSnackBar({type: 'success', content: 'success'})
    )
    yield action.payload.history(ROUTE.HOME)
  } catch (error: any) {
    yield put(registerMemberAction.signUpMemberFail())
    yield put(
      snackBarActions.setStateSnackBar({
        type: 'error',
        content: error.response.data.message,
      })
    )
  }
}

function* signUpMemberSns(
  action: PayloadAction<{data: FormData; history: NavigateFunction}>
) {
  try {
    yield call(signUpApi.signUpMemberSns, action.payload.data)
    yield put(registerMemberAction.signUpMemberSuccess())
    yield put(
      snackBarActions.setStateSnackBar({type: 'success', content: 'success'})
    )
    yield action.payload.history(ROUTE.LOGIN)
  } catch (error: any) {
    yield put(registerMemberAction.signUpMemberFail())
    yield put(
      snackBarActions.setStateSnackBar({
        type: 'error',
        content: error.response.data.message,
      })
    )
  }
}
function* updateMember(action: PayloadAction<{form: FormData; history: any}>) {
  try {
    yield call(userApi.updateProfile, action.payload.form)
    yield put(registerMemberAction.updateMemberSuccess())
    yield put(
      snackBarActions.setStateSnackBar({type: 'success', content: 'success'})
    )
    action.payload.history(-1)
    yield put(userActions.getProfile())
  } catch (error: any) {
    yield put(registerMemberAction.updateMemberFail())
    yield put(
      snackBarActions.setStateSnackBar({
        type: 'error',
        content: error.response.data.message,
      })
    )
  }
}

export default function* registermemberSaga() {
  yield takeEvery(registerMemberAction.signUpMember.type, registermember)
  yield takeEvery(registerMemberAction.updateMember.type, updateMember)
  yield takeEvery(registerMemberAction.signUpMemberSns.type, signUpMemberSns)
}
