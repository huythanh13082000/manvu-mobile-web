import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import {OptionType} from '../../types/option.type'
import { TagType } from '../../types/tag.type'

export interface TagState {
  listTag: TagType[]
}

const initialState: TagState = {
  listTag: [],
}

const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    create: (state, action: PayloadAction<{data: TagType}>) => {},
  },
})

export const tagAction = tagSlice.actions

export const tagReducer = tagSlice.reducer

export const selectListTag = (state: RootState) =>
  state.tagReducer.listTag
