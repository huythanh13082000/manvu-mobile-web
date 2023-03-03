import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

interface Tab {
  tabPointManagement: number
  tabCampaignDetail:number
}
const initialState: Tab = {
  tabPointManagement: 0,
  tabCampaignDetail:0,
}

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    activeTabPointManagement(state, action: PayloadAction<number>) {
      state.tabPointManagement = action.payload
    },
    activeTabCampaignDetail(state, action: PayloadAction<number>) {
      state.tabCampaignDetail = action.payload
    },
  },
})

export const tabActions = tabSlice.actions

export const tabReducer = tabSlice.reducer

export const selectTabPointManagement = (state: RootState) =>
  state.tabReducer.tabPointManagement
  export const selectTabCampaignDetail = (state: RootState) =>
  state.tabReducer.tabCampaignDetail
