import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {}

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    postMemberCampaignLike(state, action: PayloadAction<number>) {},
    postMemberCampaignUnLike(state, action: PayloadAction<number>) {},
    postAdvertiserCampaignLike(state, action: PayloadAction<number>) {},
    postAdvertiserCampaignUnLike(state, action: PayloadAction<number>) {},
    postReviewCampaign(
      state,
      action: PayloadAction<{id: number; url: string; type?: string}>
    ) {},
    updateReviewCampaign(
      state,
      action: PayloadAction<{id: number; url: string ; type?: string}>
    ) {},
  },
})
export const cardActions = cardSlice.actions
export const cardReducer = cardSlice.reducer
