import {call, put, takeEvery} from 'redux-saga/effects'
import {topicApi} from '../../apis/topicApi'
import { Topic } from '../../types/topic.type'
import {topicAction} from './topics.slice'

function* getListTopic() {
  try {
    const listTopic: Topic[] = yield call(topicApi.getListTopic)
    yield put(topicAction.getListTopicsSuccess(listTopic))
  } catch (error) {
    yield put(topicAction.getListTopicsFail())
  }
}

export default function* topicsSaga() {
  yield takeEvery(topicAction.getListTopics.type, getListTopic)
}
