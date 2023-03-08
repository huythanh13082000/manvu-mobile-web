import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {NavigateFunction} from 'react-router-dom'
import {RootState} from '../../app/store'
import {User} from '../../types/user.type'

export interface userState {
  loading?: boolean
  profile?: User | undefined
  initing?: boolean
  active?: number
}

const initialState: userState = {
  loading: false,
  initing: false,
  active: 0,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getProfile(state) {
      state.loading = true
    },
    getProfileSuccess(state, action: PayloadAction<{profile: User}>) {
      state.profile = action.payload.profile
      state.loading = false
      state.initing = true
    },
    getProfileFail(state) {
      state.loading = false
      state.profile = undefined
      state.initing = false
    },
    activeTab(state, action: PayloadAction<number>) {
      state.active = action.payload
    },
    forgotPasswordSendMail(
      state,
      action: PayloadAction<{email: string; history: NavigateFunction}>
    ) {},
  },
})
//actions
export const userActions = userSlice.actions
//selector
export const selectUser = (state: RootState) => state.userReducer
export const selectUserLoading = (state: RootState) => state.userReducer.loading
export const selectActiveTab = (state: RootState) => state.userReducer.active
//reducer
const userReducer = userSlice.reducer
export default userReducer
