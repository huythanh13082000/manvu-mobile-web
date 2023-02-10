import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { NavigateFunction } from 'react-router-dom';

const initialState = {}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        data: {user_email: string; user_password: string}
        history: NavigateFunction
      }>
    ) => {
      console.log(122, action)
    },
  },
})

export const authAction = authSlice.actions
export const authReducer = authSlice.reducer
