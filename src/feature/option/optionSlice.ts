import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import {OptionType} from '../../types/option.type'

export interface OptionState {
  listOption: OptionType[]
}

const initialState: OptionState = {
  listOption: [],
}

const optionSlice = createSlice({
  name: 'option',
  initialState,
  reducers: {
    create: (state, action: PayloadAction<{data: OptionType}>) => {},
  },
})

export const optionAction = optionSlice.actions

export const optionReducer = optionSlice.reducer

export const selectListOption = (state: RootState) =>
  state.optionReducer.listOption
