import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeEvery } from 'redux-saga/effects'
import { signUpApi } from '../../apis/signUpApi'
import { userApi } from '../../apis/userApi'
import { snackBarActions } from '../../components/snackbar/snackbarSlice'
import { userActions } from '../user/user.slice'
import { registerMemberAction } from './registerMember.slice'

function* registermember(action: PayloadAction<FormData>) {
  try {
    yield call(signUpApi.signUpMember, action.payload)
    yield put(registerMemberAction.signUpMemberSuccess())
    yield put(
      snackBarActions.setStateSnackBar({type: 'success', content: 'success'})
    )
    yield put(registerMemberAction.setStatus(true))
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

function* signUpMemberSns(action: PayloadAction<FormData>) {
  try {
    yield call(signUpApi.signUpMemberSns, action.payload)
    yield put(registerMemberAction.signUpMemberSuccess())
    yield put(
      snackBarActions.setStateSnackBar({type: 'success', content: 'success'})
    )
    yield put(registerMemberAction.setStatus(true))
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
