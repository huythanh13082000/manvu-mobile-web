import {createSlice} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'

interface loadingState {
  open: boolean
}

const initialState: loadingState = {
  open: false,
}
const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    openLoading(state) {
      state.open = true
    },
    loadingSuccess(state) {
      state.open = false
    },
  },
})

export const loadingActions = loadingSlice.actions

export const SelectLoading = (state: RootState) => state.loadingReducer.open

export const loadingReducer = loadingSlice.reducer
