import {PayloadAction} from '@reduxjs/toolkit'
import {call, takeEvery} from 'redux-saga/effects'
import {optionApi} from '../../apis/optionApi'
import {uploadApi} from '../../apis/uploadApi'
import {OptionType} from '../../types/option.type'
import {optionAction} from './optionSlice'

function* createOption(action: PayloadAction<{data: OptionType}>) {
  try {
    console.log('data', action.payload.data)
    const formData = new FormData()
    formData.append('picture', action.payload.data.image as File)
    const dataImage: {data: string} = yield call(
      uploadApi.uploadImage,
      formData
    )
    console.log(21213231, dataImage)
    console.log(action.payload.data)
    const data: {
      code: number
    } = yield call(optionApi.create, {
      ...action.payload.data,
      image: dataImage.data,
    })
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

export function* optionSaga() {
  yield takeEvery(optionAction.create.type, createOption)
}
