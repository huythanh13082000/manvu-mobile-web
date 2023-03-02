import axiosClient from './axiosClient'
import {PLACE_API} from './urlConfig'

export const placeApi = {
  getPlace(params: {input: string; language: string; key: string}) {
    return axiosClient.get(PLACE_API, {params})
  },
}
