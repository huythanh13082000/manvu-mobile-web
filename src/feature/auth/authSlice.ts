import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState = {}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{user_email: string; user_password: string}>
    ) => {
      console.log(122, action)
    },
  },
})

export const authAction = authSlice.actions
export const authReducer = authSlice.reducer
