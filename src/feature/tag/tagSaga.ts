import { PayloadAction } from '@reduxjs/toolkit'
import { call, takeEvery } from 'redux-saga/effects'
import { tagApi } from '../../apis/tagApi'
import { TagType } from '../../types/tag.type'
import { tagAction } from './tagSlice'

function* createTag(action: PayloadAction<{data: TagType}>) {
  try {
    const data: {
      code: number
    } = yield call(tagApi.create, {
      ...action.payload.data,
    })
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

export function* tagSaga() {
  yield takeEvery(tagAction.create.type, createTag)
}
