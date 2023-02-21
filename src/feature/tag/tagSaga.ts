import {PayloadAction} from '@reduxjs/toolkit'
import {call, put, takeEvery} from 'redux-saga/effects'
import {tagApi} from '../../apis/tagApi'
import {snackBarActions} from '../../components/snackbar/snackbarSlice'
import {GetParamsType} from '../../types/getParams.type'
import {TagType} from '../../types/tag.type'
import {tagAction} from './tagSlice'

function* createTag(action: PayloadAction<{data: TagType; setOpen: Function}>) {
  try {
    const data: {
      code: number
    } = yield call(tagApi.create, {
      ...action.payload.data,
    })
    if (data.code === 0) {
      yield action.payload.setOpen()
      yield put(
        snackBarActions.setStateSnackBar({content: 'success', type: 'success'})
      )
    } else {
      yield put(
        snackBarActions.setStateSnackBar({content: 'error', type: 'error'})
      )
    }
  } catch (error) {
    console.log(error)
    yield put(
      snackBarActions.setStateSnackBar({content: 'error', type: 'error'})
    )
  }
}
function* getTag(action: PayloadAction<GetParamsType>) {
  try {
    const data: {
      code: number
      data: {listTags: TagType[]; total: number}
    } = yield call(tagApi.get, action.payload)
    if (data.code === 0) {
      yield put(tagAction.getSuccess({data: data.data}))
    } else {
      yield put(
        snackBarActions.setStateSnackBar({content: 'error', type: 'error'})
      )
    }
  } catch (error) {
    console.log(error)
  }
}

export function* tagSaga() {
  yield takeEvery(tagAction.create.type, createTag)
  yield takeEvery(tagAction.get.type, getTag)
}
