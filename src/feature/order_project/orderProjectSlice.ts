import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {NavigateFunction} from 'react-router-dom'
import {RootState} from '../../app/store'
import {GetParamsType} from '../../types/getParams.type'
import {OrderProjectType} from '../../types/orderProject.type'

interface State {
  listOrderProject: OrderProjectType[]
  loading: boolean
  total?: number
}

const initialState: State = {
  listOrderProject: [],
  loading: false,
}

const orderProjectSlice = createSlice({
  name: 'orderProject',
  initialState,
  reducers: {
    create: (
      state,
      action: PayloadAction<{data: OrderProjectType; history: NavigateFunction}>
    ) => {
      console.log(action)
    },
    update: (
      state,
      action: PayloadAction<{data: OrderProjectType; history: NavigateFunction}>
    ) => {
      console.log(action)
    },
    get: (state, action: PayloadAction<GetParamsType>) => {
      state.loading = true
    },
    getSuccess: (
      state,
      action: PayloadAction<{
        data: {listOrder: OrderProjectType[]; total: number}
      }>
    ) => {
      state.listOrderProject = action.payload.data.listOrder
      state.total = action.payload.data.total
      state.loading = false
    },
    getFail: (state) => {
      state.loading = false
    },
  },
})

export const orderProjectAction = orderProjectSlice.actions

export const orderProjectReducer = orderProjectSlice.reducer

export const selectListOrderProject = (state: RootState) =>
  state.orderProjectReducer.listOrderProject

export const selectTotalOrderProject = (state: RootState) =>
  state.orderProjectReducer.total
