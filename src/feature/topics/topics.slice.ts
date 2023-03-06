import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import {Topic} from '../../types/topic.type'

interface TopicState {
  loadding: boolean
  listTopic?: Topic[]
}

const initialState: TopicState = {
  loadding: false,
}

const topics = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    getListTopics(state) {
      state.loadding = true
    },
    getListTopicsSuccess(state, action: PayloadAction<Topic[]>) {
      state.loadding = false
      state.listTopic = action.payload
    },
    getListTopicsFail(state) {
      state.loadding = false
    },
  },
})

export const topicAction = topics.actions
export const topicReducer = topics.reducer

export const selectListTopic = (state: RootState) =>
  state.topicReducer.listTopic
