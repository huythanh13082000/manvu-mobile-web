import {all} from 'redux-saga/effects'
import authSaga from '../feature/auth/authSaga'
import portfolioSaga from '../feature/portfolio/portfolioSaga'
export default function* rootSaga() {
  yield all([authSaga(),portfolioSaga()])
}
