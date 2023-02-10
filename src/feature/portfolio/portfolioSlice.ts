import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState = {}

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    create: (state, action: PayloadAction<FormData>) => {
      console.log(action)
    },
  },
})

export const portfolioAction = portfolioSlice.actions

export const portfolioReducer = portfolioSlice.reducer
