import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import {User} from '../../types/user.type'

interface RegisterMemberState {
  loadding: boolean
  userProfile?: User
  status: boolean
}

const initialState: RegisterMemberState = {
  loadding: false,
  status: false,
}

const registerMember = createSlice({
  name: 'registerMember',
  initialState,
  reducers: {
    signUpMember(state, action: PayloadAction<FormData>) {
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
    setStatus(state, action: PayloadAction<boolean>) {
      state.status = action.payload
    },
  },
})

export const registerMemberAction = registerMember.actions

export const selectStatus = (state: RootState) =>
  state.registerMemberReducer.status

export const registerMemberReducer = registerMember.reducer
