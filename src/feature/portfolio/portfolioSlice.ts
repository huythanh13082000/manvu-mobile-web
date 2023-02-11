import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {NavigateFunction} from 'react-router-dom'
import {PortfolioType} from '../../types/portfolio.type'

const initialState = {}

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    create: (
      state,
      action: PayloadAction<{data: PortfolioType; history: NavigateFunction}>
    ) => {
      console.log(action)
    },
  },
})

export const portfolioAction = portfolioSlice.actions

export const portfolioReducer = portfolioSlice.reducer
