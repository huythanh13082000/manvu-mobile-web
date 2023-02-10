import axiosClient from './axiosClient'
import {UPLOAD_fILE, UPLOAD_IMAGE, UPLOAD_IMAGES} from './urlConfig'

export const uploadApi = {
  uploadImage: (payload: FormData) => {
    return axiosClient.post(UPLOAD_IMAGE, payload)
  },
  uploadImages: (payload: FormData) => {
    return axiosClient.post(UPLOAD_IMAGES, payload)
  },
  uploadFile: (payload: FormData) => {
    return axiosClient.post(UPLOAD_fILE, payload)
  },
}
