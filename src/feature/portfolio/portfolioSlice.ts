import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {NavigateFunction} from 'react-router-dom'
import {RootState} from '../../app/store'
import {GetParamsType} from '../../types/getParams.type'
import {PortfolioType} from '../../types/portfolio.type'

interface State {
  listPortfolio: PortfolioType[]
  loading: boolean
  total?: number
}

const initialState: State = {
  listPortfolio: [],
  loading: false,
}

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    create: (
      state,
      action: PayloadAction<{data: PortfolioType; history: NavigateFunction}>
    ) => {
    },
    update: (
      state,
      action: PayloadAction<{data: PortfolioType; history: NavigateFunction}>
    ) => {
    },
    get: (state, action: PayloadAction<GetParamsType>) => {
      state.loading = true
    },
    getSuccess: (
      state,
      action: PayloadAction<{
        data: {listPortfolios: PortfolioType[]; total: number}
      }>
    ) => {
      state.listPortfolio = action.payload.data.listPortfolios
      state.total = action.payload.data.total
      state.loading = false
    },
    getFail: (state) => {
      state.loading = false
    },
  },
})

export const portfolioAction = portfolioSlice.actions

export const portfolioReducer = portfolioSlice.reducer

export const selectListPortfolio = (state: RootState) =>
  state.portfolioReducer.listPortfolio

export const selectTotalPortfolio = (state: RootState) =>
  state.portfolioReducer.total
