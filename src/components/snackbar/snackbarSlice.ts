import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import {SnackBarType} from '../../types/snackbar.type'

interface snackBarState extends SnackBarType {
  open: boolean
}

const initialState: snackBarState = {
  open: false,
  content: '',
  type: 'error',
}
const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setStateSnackBar(state, action: PayloadAction<SnackBarType>) {
      state.open = false
      state.type = 'error'
      state.content = ''
      state.content = action.payload.content
      state.open = true
      state.type = action.payload.type
    },
  },
})

export const snackBarActions = snackbarSlice.actions

export const SelectSnackBar = (state: RootState) => state.snackBarReducer

export const snackBarReducer = snackbarSlice.reducer
