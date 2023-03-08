import {PayloadAction} from '@reduxjs/toolkit'
import {call, put, takeLatest} from 'redux-saga/effects'
import {authApi} from '../../apis/authApi'
import {setTokenAxios} from '../../apis/axiosClient'
import {ROUTE} from '../../router/routes'
import {User} from '../../types/user.type'
import {userActions} from '../user/user.slice'
import {authActions, LoginPayload} from './auth.slice'

function* handleLogin(action: PayloadAction<LoginPayload>) {
  try {
    const User: User = yield call(authApi.post, {...action.payload})
    yield localStorage.setItem('token', User.token || '')
    yield setTokenAxios()
    yield put(authActions.loginSuccess(User))
    yield put(userActions.getProfileSuccess({profile: User}))
    action.payload &&
      action.payload.history &&
      action.payload.history(ROUTE.HOME)
  } catch (error: any) {
    if (error.response.data.message === 'Username does not exist!') {
      yield put(
        authActions.loginFailed('가입하지 않은 회원입니다. 가입해주세요.')
      )
    } else {
      yield put(
        authActions.loginFailed(
          '사용자 이름 또는 비밀번호가 틀릴 수 있으므로 다시 확인하십시오'
        )
      )
    }
  }
}

function* loginSns(
  action: PayloadAction<{
    loginType: number
    snsLoginId: string
    snsEmail: string
    photoURL: string
  }>
) {
  try {
    const user: User = yield call(authApi.signInSns, {...action.payload})
    yield localStorage.setItem('token', user.token || '')
    setTokenAxios()
    yield put(authActions.loginSuccess(user))
  } catch (error) {
    yield put(
      authActions.loginSnsFail({
        snsEmail: action.payload.snsEmail,
        photoURL: action.payload.photoURL,
        loginType: action.payload.loginType,
        snsLoginId: action.payload.snsLoginId,
      })
    )
  }
}
export default function* authSaga() {
  yield takeLatest(authActions.login.type, handleLogin)
  yield takeLatest(authActions.loginSns.type, loginSns)
}
