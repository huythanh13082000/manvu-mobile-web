import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {NavigateFunction} from 'react-router-dom'
import {RootState} from '../../app/store'
import {User} from '../../types/user.type'

export interface LoginPayload {
  username: string
  password: string
  history?: NavigateFunction
}

export interface snsUserInfor {
  snsEmail: string
  photoURL: string
  loginType: number
  snsLoginId: string
}
export interface AuthState {
  isLoggedId: boolean
  logging?: boolean
  logginFail?: boolean
  currentUser?: User
  snsUserInfor?: snsUserInfor
  loginSns: boolean
  loginMessage?: string
}

const initialState: AuthState = {
  isLoggedId: false,
  logging: false,
  currentUser: undefined,
  logginFail: false,
  loginSns: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.logginFail = false
      state.logging = false
      state.isLoggedId = true
      state.currentUser = action.payload
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.logging = false
      state.logginFail = true
      state.loginMessage = action.payload
    },
    logout(state) {
      state.logginFail = false
      state.isLoggedId = false
      state.currentUser = undefined
    },
    loginSns(
      state,
      action: PayloadAction<{
        loginType: number
        snsLoginId: string
        snsEmail?: string
        photoURL?: string
      }>
    ) {
      state.logging = true
    },
    loginSnsFail(state, action: PayloadAction<snsUserInfor>) {
      state.snsUserInfor = action.payload
      state.logging = false
      state.loginSns = true
    },
    setLoginSns(state) {
      state.loginSns = false
    },
    resetCurrentUser(state) {
      state.currentUser = undefined
    },
  },
})
//Actions
export const authActions = authSlice.actions
//Selectors

export const selectIsLoggedIn = (state: RootState) =>
  state.authReducer.isLoggedId
export const selectIsLogging = (state: RootState) => state.authReducer.logging
export const selectCurrentUser = (state: RootState) =>
  state.authReducer.currentUser
export const selectloginFail = (state: RootState) =>
  state.authReducer.logginFail
export const selectSnsUserInfor = (state: RootState) =>
  state.authReducer.snsUserInfor
//Reducers
export const selectLoginSns = (state: RootState) => state.authReducer.loginSns
export const selectLoginMessage = (state: RootState) =>
  state.authReducer.loginMessage

const authReducer = authSlice.reducer
export default authReducer
