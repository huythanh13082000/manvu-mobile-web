import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Campaign } from '../../types/campaign.type'
import { MemberCampaignMineCount } from '../../types/memberCampaignMineCount.type'


interface MyCampaign {
  memberCampaignMineCount?: MemberCampaignMineCount
  loadding?: boolean
  listCampaign?: {list?: Campaign[]}
}

const initialState: MyCampaign = {
  memberCampaignMineCount: {
    countPending: 0,
    countAccepted: 0,
    countPosted: 0,
    countEnded: 0,
    countRequestingUpdate: 0,
  },
  loadding: false,
  listCampaign: {list: []},
}
const myCampaignSlice = createSlice({
  name: 'myCampaign',
  initialState,
  reducers: {
    getMemberCampaignMineCount(state) {
      state.loadding = true
    },
    getMemberCampaignMineCountSuccess(
      state,
      action: PayloadAction<MemberCampaignMineCount>
    ) {
      state.loadding = false
      state.memberCampaignMineCount = action.payload
    },
    getMemberCampaignMineCountFail(state) {
      state.loadding = false
    },
    getMemberCampaignMine(
      state,
      action: PayloadAction<{
        type: string
        medias?: string
        tagIds?: string
        sortBy?: string
      }>
    ) {
      state.loadding = true
    },
    getMemberCampaignMineSuccess(
      state,
      action: PayloadAction<{list?: Campaign[]}>
    ) {
      state.listCampaign = action.payload
      state.loadding = false
    },
    getMemberCampaignMineFail(state) {
      state.loadding = false
    },
  },
})
export const myCampaignReducer = myCampaignSlice.reducer
export const myCampaignActions = myCampaignSlice.actions
export const selectMemberCampaignMineCount = (state: RootState) =>
  state.myCampaignReducer.memberCampaignMineCount
export const selectMemberCampaignMine = (state: RootState) =>
  state.myCampaignReducer.listCampaign
