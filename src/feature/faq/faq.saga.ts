import {PayloadAction} from '@reduxjs/toolkit'
import {call, put, takeEvery} from 'redux-saga/effects'
import {faqApi} from '../../apis/faqApi'
import { FaqDetail, TabFaq } from '../../types/faq.type'
import {faqActions} from './fag.slice'

function* getListTabFaq() {
  try {
    const listTabFaq: {list: TabFaq[]} = yield call(faqApi.getListTabFaq)
    yield put(faqActions.getListTabFaqSuccess(listTabFaq.list))
  } catch (error) {
    yield put(faqActions.getListTabFaqFail())
  }
}
function* getListFaqDetail(action: PayloadAction<number>) {
  try {
    const listFaqDetail: {list: FaqDetail[]} = yield call(
      faqApi.getListFaqDetail,
      action.payload
    )
    yield put(faqActions.getListFaqDetailSucces(listFaqDetail.list))
  } catch (error) {
    yield put(faqActions.getListFaqDetailFail())
  }
}

export default function* faqSaga() {
  yield takeEvery(faqActions.getListTabFaq.type, getListTabFaq)
  yield takeEvery(faqActions.getListFaqDetail.type, getListFaqDetail)
}
