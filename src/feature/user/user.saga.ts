import {PayloadAction} from '@reduxjs/toolkit'
import {call, put, takeEvery} from 'redux-saga/effects'
import {authApi} from '../../apis/authApi'
import {userApi} from '../../apis/userApi'
import { snackBarActions } from '../../components/snackbar/snackbarSlice'
import { User } from '../../types/user.type'
import {userActions} from './user.slice'

function* getUser() {
  try {
    const userProfile: {profile: User} = yield call(userApi.getUser)
    yield put(userActions.getProfileSuccess(userProfile))
  } catch (error) {
    yield put(userActions.getProfileFail())
  }
}
function* forgotPasswordSendMail(action: PayloadAction<{email: string}>) {
  try {
    yield call(authApi.forgotPassWordSendMail, action.payload)
    yield put(
      snackBarActions.setStateSnackBar({
        content: '이메일을 확인해주세요',
        type: 'success',
      })
    )
  } catch (error) {
    yield put(
      snackBarActions.setStateSnackBar({
        content: '이메일이 정확하지 않습니다',
        type: 'error',
      })
    )
  }
}

export default function* userSaga() {
  yield takeEvery(userActions.getProfile.type, getUser)
  yield takeEvery(
    userActions.forgotPasswordSendMail.type,
    forgotPasswordSendMail
  )
}
