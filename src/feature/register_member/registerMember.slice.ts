import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {NavigateFunction} from 'react-router-dom'
import {User} from '../../types/user.type'

interface RegisterMemberState {
  loadding: boolean
  userProfile?: User
}

const initialState: RegisterMemberState = {
  loadding: false,
}

const registerMember = createSlice({
  name: 'registerMember',
  initialState,
  reducers: {
    signUpMember(
      state,
      action: PayloadAction<{
        data: FormData
        history: NavigateFunction
        user: {username: string; password: string}
      }>
    ) {
      state.loadding = true
    },
    signUpMemberSuccess(state) {
      state.loadding = false
    },
    signUpMemberFail(state) {
      state.loadding = false
    },
    signUpMemberSns(state, action: PayloadAction<FormData>) {
      state.loadding = true
    },
    updateMember(state, action: PayloadAction<{form: FormData; history: any}>) {
      state.loadding = true
    },
    updateMemberSuccess(state) {
      state.loadding = false
    },
    updateMemberFail(state) {
      state.loadding = false
    },
  },
})

export const registerMemberAction = registerMember.actions

export const registerMemberReducer = registerMember.reducer
