import {all} from 'redux-saga/effects'
import authSaga from '../feature/auth/authSaga'
import {optionSaga} from '../feature/option/optionSaga'
import orderProjectSaga from '../feature/order_project/orderProjectSaga'
import portfolioSaga from '../feature/portfolio/portfolioSaga'
import {tagSaga} from '../feature/tag/tagSaga'
export default function* rootSaga() {
  yield all([
    authSaga(),
    portfolioSaga(),
    orderProjectSaga(),
    optionSaga(),
    tagSaga(),
  ])
}
