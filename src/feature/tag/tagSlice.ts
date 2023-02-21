import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import {GetParamsType} from '../../types/getParams.type'
import {OptionType} from '../../types/option.type'
import {TagType} from '../../types/tag.type'

export interface TagState {
  listTag: TagType[]
  loading: boolean
  total: number
}

const initialState: TagState = {
  listTag: [],
  loading: false,
  total: 0,
}

const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    create: (
      state,
      action: PayloadAction<{data: TagType; setOpen: Function}>
    ) => {},
    get: (state, action: PayloadAction<GetParamsType>) => {
      state.loading = true
    },
    getSuccess: (
      state,
      action: PayloadAction<{
        data: {listTags: TagType[]; total: number}
      }>
    ) => {
      state.listTag = action.payload.data.listTags
      state.total = action.payload.data.total
      state.loading = false
    },
    getFail: (state) => {
      state.loading = false
    },
  },
})

export const tagAction = tagSlice.actions

export const tagReducer = tagSlice.reducer

export const selectListTag = (state: RootState) => state.tagReducer.listTag
