import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { CampaignAdvertiser } from '../../types/campaignAdvertiser.type'



export interface AdvertiserCampaignMineCount {
  countTotal: number
  countInProgress: number
  countComplete: number
  countRequestUpdate: number
}
interface MyCampaignAdvertiser {
  advertiserCampaignMineCount: AdvertiserCampaignMineCount
  loadding?: boolean
  listCampaign?: {list?: CampaignAdvertiser[]}
  total: number | undefined
}

const initialState: MyCampaignAdvertiser = {
  advertiserCampaignMineCount: {
    countTotal: 0,
    countInProgress: 0,
    countComplete: 0,
    countRequestUpdate: 0,
  },
  loadding: false,
  listCampaign: {list: []},
  total: undefined,
}
const myCampaignAdvertiserSlice = createSlice({
  name: 'myCampaignAdvertiser',
  initialState,
  reducers: {
    // advertiser

    getAdvertiserCampaignMineCount(state) {
      state.loadding = true
    },
    getAdvertiserCampaignMineCountSuccess(
      state,
      action: PayloadAction<AdvertiserCampaignMineCount>
    ) {
      state.loadding = false
      state.advertiserCampaignMineCount = action.payload
    },
    getAdvertiserCampaignMineCountFail(state) {
      state.loadding = false
    },

    getAdvertiserCampaignMine(
      state,
      action: PayloadAction<{type?: string; medias?: string}>
    ) {
      state.loadding = true
    },
    getAdvertiserCampaignMineSuccess(
      state,
      action: PayloadAction<{list?: CampaignAdvertiser[]; total: number}>
    ) {
      state.listCampaign = action.payload
      state.loadding = false
      state.total = action.payload.total
    },
    getAdvertiserCampaignMineFail(state) {
      state.loadding = false
    },
  },
})

export const myCampaignAdvertiserActions = myCampaignAdvertiserSlice.actions
export const myCampaignAdvertiserReducer = myCampaignAdvertiserSlice.reducer
export const selectAdvertiserCampaignMineCount = (state: RootState) =>
  state.myCampaignAdvertiserReducer.advertiserCampaignMineCount
export const selectAdvertiserCampaignMine = (state: RootState) =>
  state.myCampaignAdvertiserReducer.listCampaign
export const selectAdvertiserCampaignTotal = (state: RootState) =>
  state.myCampaignAdvertiserReducer.total
