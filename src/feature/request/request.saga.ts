import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeEvery } from 'redux-saga/effects'
import { questionApi } from '../../apis/questionApi'
import { uploadImagesThumbsApi } from '../../apis/uploadImagesThumbsApi'
import { snackBarActions } from '../../components/snackbar/snackbarSlice'
import { Question } from '../../types/question.type'
import { requestActions } from './request.slice'

function* getListQuestion(
  action: PayloadAction<{limit: number; offset: number}>
) {
  try {
    const listQuestion: {list: Question[]; total: number} = yield call(
      questionApi.getQuestionApi,
      action.payload
    )
    yield put(requestActions.getListQuestionSuccess(listQuestion))
  } catch (error) {
    yield put(requestActions.getListQuestionFail())
  }
}
function* getListQuestion2(
  action: PayloadAction<{limit: number; offset: number}>
) {
  try {
    const listQuestion: {list: Question[]; total: number} = yield call(
      questionApi.getQuestionApi,
      action.payload
    )
    yield put(requestActions.getListQuestionSuccess2(listQuestion))
  } catch (error) {
    yield put(requestActions.getListQuestionFail())
  }
}
function* getQuestionDetail(action: PayloadAction<number>) {
  try {
    const questionDetail: Question = yield call(
      questionApi.getQuestionDetailApi,
      action.payload
    )
    yield put(requestActions.getQuestionDetailSuccess(questionDetail))
  } catch (error) {
    yield put(requestActions.getQuestionDetailFail())
  }
}

function* deleteQuestion(action: PayloadAction<number>) {
  try {
    yield call(questionApi.deleteQuestionApi, action.payload)
    yield put(requestActions.deleteQuestionSuccess())
    yield put(requestActions.getListQuestion2({limit: 20}))
  } catch (error) {
    yield put(requestActions.deleteQuestionFail())
  }
}
function* answerQuestion(
  action: PayloadAction<{id: number; data: FormData; content?: string}>
) {
  try {
    let fileUpload: {images?: []; thumbs?: []} = {}
    if (!action.payload.data.entries().next().done) {
      fileUpload = yield call(
        uploadImagesThumbsApi.uploadImagesThumbs,
        action.payload.data
      )
    }
    yield call(questionApi.answerQuestionApi, {
      id: action.payload.id,
      params: {
        images: fileUpload.images,
        thumbnails: fileUpload.thumbs,
        content: action.payload.content,
      },
    })
    yield put(requestActions.getQuestionDetail(action.payload.id))
  } catch (error) {
    console.log(error)
  }
}

function* createQuestion(
  action: PayloadAction<{
    formData: FormData
    data: {
      content?: string
      category?: string
      phoneNumber?: string
      type?: string
    }
  }>
) {
  try {
    let fileUpload: {images?: []; thumbs?: []} = {}
    if (!action.payload.formData.entries().next().done) {
      fileUpload = yield call(
        uploadImagesThumbsApi.uploadImagesThumbs,
        action.payload.formData
      )
    }
    yield call(questionApi.createQuestionApi, {
      ...action.payload.data,
      images: fileUpload.images,
      thumbnails: fileUpload.thumbs,
    })
    yield put(requestActions.createQuestionSuccess())
    yield put(requestActions.getListQuestion2({limit: 20}))
  } catch (error: any) {
    yield put(requestActions.createQuestionFail())
    yield put(
      snackBarActions.setStateSnackBar({
        type: 'error',
        content: error.response.data.message,
      })
    )
  }
}

function* updateQuestion(
  action: PayloadAction<{
    formData: FormData
    data: {
      content?: string
      category?: string
      phoneNumber?: string
      type?: string
      images?: string[]
      thumbnails?: string[]
      id?: number
    }
  }>
) {
  try {
    let fileUpload: {images?: []; thumbs?: []} = {}
    if (!action.payload.formData.entries().next().done) {
      fileUpload = yield call(
        uploadImagesThumbsApi.uploadImagesThumbs,
        action.payload.formData
      )
    }
    yield call(questionApi.updateQuestionApi, {
      ...action.payload.data,
      images: action.payload.data.images?.concat(fileUpload.images || []),
      thumbnails: action.payload.data.thumbnails?.concat(
        fileUpload.thumbs || []
      ),
    })
    yield put(requestActions.updateQuestionSuccess())
    yield put(requestActions.getListQuestion2({limit: 20}))
  } catch (error) {
    yield put(requestActions.updateQuestionFail())
  }
}

export default function* RequestSaga() {
  yield takeEvery(requestActions.getListQuestion.type, getListQuestion)
  yield takeEvery(requestActions.getListQuestion2.type, getListQuestion2)
  yield takeEvery(requestActions.getQuestionDetail.type, getQuestionDetail)
  yield takeEvery(requestActions.answerQuestion.type, answerQuestion)
  yield takeEvery(requestActions.deleteQuestion.type, deleteQuestion)
  yield takeEvery(requestActions.createQuestion.type, createQuestion)
  yield takeEvery(requestActions.updateQuestion.type, updateQuestion)
}
