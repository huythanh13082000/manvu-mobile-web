import {PayloadAction} from '@reduxjs/toolkit'
import {NavigateFunction} from 'react-router-dom'
import {call, put, takeEvery} from 'redux-saga/effects'
import {authApi} from '../../apis/authApi'
import {userApi} from '../../apis/userApi'
import { loadingActions } from '../../components/loading/loadingSlice'
import {snackBarActions} from '../../components/snackbar/snackbarSlice'
import {ROUTE} from '../../router/routes'
import {User} from '../../types/user.type'
import {userActions} from './user.slice'

function* getUser() {
  try {
    yield put(loadingActions.openLoading())
    const userProfile: {profile: User} = yield call(userApi.getUser)
    yield put(userActions.getProfileSuccess(userProfile))
    yield put(loadingActions.loadingSuccess())
  } catch (error) {
    yield put(loadingActions.loadingSuccess())
    yield put(userActions.getProfileFail())
  }
}
function* forgotPasswordSendMail(
  action: PayloadAction<{email: string; history: NavigateFunction}>
) {
  try {
    yield call(authApi.forgotPassWordSendMail, action.payload)
    yield put(
      snackBarActions.setStateSnackBar({
        content: '이메일을 확인해주세요',
        type: 'success',
      })
    )
    action.payload.history(ROUTE.LOGIN)
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
