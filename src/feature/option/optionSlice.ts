import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import {GetParamsType} from '../../types/getParams.type'
import {OptionType} from '../../types/option.type'

export interface OptionState {
  listOption: OptionType[]
  loading: boolean
  total: number
}

const initialState: OptionState = {
  listOption: [],
  loading: false,
  total: 0,
}

const optionSlice = createSlice({
  name: 'option',
  initialState,
  reducers: {
    create: (
      state,
      action: PayloadAction<{data: OptionType; setOpen: Function}>
    ) => {},
    update: (
      state,
      action: PayloadAction<{data: OptionType; setOpen: Function}>
    ) => {},
    get: (state, action: PayloadAction<GetParamsType>) => {
      state.loading = true
    },
    getSuccess: (
      state,
      action: PayloadAction<{
        data: {listOption: OptionType[]; total: number}
      }>
    ) => {
      state.listOption = action.payload.data.listOption
      state.total = action.payload.data.total
      state.loading = false
    },
    getFail: (state) => {
      state.loading = false
    },
  },
})

export const optionAction = optionSlice.actions

export const optionReducer = optionSlice.reducer

export const selectListOption = (state: RootState) =>
  state.optionReducer.listOption
