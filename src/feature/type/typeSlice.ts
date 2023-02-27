import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import {GetParamsType} from '../../types/getParams.type'
import {OptionType} from '../../types/option.type'
import {TagType} from '../../types/tag.type'
import { TypeType } from '../../types/type.type'

export interface TypeState {
  listType: TagType[]
  loading: boolean
  total: number
}

const initialState: TypeState = {
  listType: [],
  loading: false,
  total: 0,
}

const typeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {
    create: (
      state,
      action: PayloadAction<{data: TypeType; setOpen: Function}>
    ) => {},
    update: (
      state,
      action: PayloadAction<{data: TypeType; setOpen: Function}>
    ) => {},
    get: (state, action: PayloadAction<GetParamsType>) => {
      state.loading = true
    },
    getSuccess: (
      state,
      action: PayloadAction<{
        data: {listTypes: TypeType[]; total: number}
      }>
    ) => {
      state.listType = action.payload.data.listTypes
      state.total = action.payload.data.total
      state.loading = false
    },
    getFail: (state) => {
      state.loading = false
    },
  },
})

export const typeAction = typeSlice.actions

export const typeReducer = typeSlice.reducer

export const selectListType = (state: RootState) => state.typeReducer.listType
