import {all} from 'redux-saga/effects'
import authSaga from '../feature/auth/authSaga'
export default function* rootSaga() {
  yield all([
    authSaga(),
  ])
}
