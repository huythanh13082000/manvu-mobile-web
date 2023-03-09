import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {NavigateFunction} from 'react-router-dom'
import {RootState} from '../../app/store'
import {CreateCampaign} from '../../types/createCampaign.type'
import {Place} from '../../types/place.type'

interface createCampaignState extends CreateCampaign {
  loadding?: boolean
  listHashTag?: {id: number; text: string}[]
  listTabId?: {id: number; tabId: number; text: string}[]
  listPlace: Place[] | []
}

const initialState: createCampaignState = {
  loadding: false,
  listPlace: [],
}

const createCampaignSlice = createSlice({
  name: 'createCampaign',
  initialState,
  reducers: {
    createCampaign(state, action: PayloadAction<CreateCampaign>) {
      state.loadding = true
    },
    createCampaignSuccess(state) {
      state.loadding = false
    },
    createCampaignFail(state) {
      state.loadding = false
    },
    updateCampaign(
      state,
      action: PayloadAction<{data: CreateCampaign; history: NavigateFunction}>
    ) {
      state.loadding = true
    },
    updateCampaignSuccess(state) {
      state.loadding = false
    },
    updateCampaignFail(state) {
      state.loadding = false
    },
    getListHashTag(state) {
      state.loadding = true
    },
    getListHashTagSuccess(
      state,
      action: PayloadAction<{id: number; text: string}[]>
    ) {
      state.loadding = false
      state.listHashTag = action.payload
    },
    getListHashTagFail(state) {
      state.loadding = false
    },
    getListTabId(
      state,
      action: PayloadAction<{
        tabId?: number
        categoryId?: number
        limit?: number
      }>
    ) {
      state.loadding = true
    },
    getListTabIdSuccess(
      state,
      action: PayloadAction<{id: number; tabId: number; text: string}[]>
    ) {
      state.loadding = false
      state.listTabId = action.payload
    },
    getListTabIdFail(state) {
      state.loadding = false
    },
    getListPlace(
      state,
      action: PayloadAction<{input: string; language: string; key: string}>
    ) {
      state.loadding = true
    },
    getListPlaceSuccess(state, action: PayloadAction<Place[]>) {
      state.loadding = false
      state.listPlace = action.payload
    },
    getListPlaceFail(state) {
      state.loadding = false
    },
  },
})

export const createCampaignActions = createCampaignSlice.actions

export const selectListHashTag = (state: RootState) =>
  state.createCampaignReducer.listHashTag
export const SelectListTabId = (state: RootState) =>
  state.createCampaignReducer.listTabId
export const selectListPlace = (state: RootState) =>
  state.createCampaignReducer.listPlace

export const createCampaignReducer = createCampaignSlice.reducer
