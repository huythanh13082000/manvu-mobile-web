import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CardChannelState {
  loadding: boolean
}

const initialState: CardChannelState = {
  loadding: false,
}
const cardChannelSlice = createSlice({
  name: 'cardChannel',
  initialState,
  reducers: {
    replyRequest(
      state,
      action: PayloadAction<{id?: number; status: number; campaignId?: number}>
    ) {
      state.loadding = true
    },
    replyRequestSuccess(state) {
      state.loadding = true
    },
    replyRequestFail(state) {
      state.loadding = true
    },
    postCampaignStatus(
      state,
      action: PayloadAction<{
        id: number
        idPost: number
        status: number
        review: string
      }>
    ) {
    },
    advertiserLikePost(state, action: PayloadAction<number>) {},
    advertiserUnLikePost(state, action: PayloadAction<number>) {},
  },
})
export const cardChannelActions = cardChannelSlice.actions
export const cardChannelReducer = cardChannelSlice.reducer
