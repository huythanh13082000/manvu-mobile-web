import axiosClient from './axiosClient'
import {UPLOAD_IMAGES_THUMBS_API} from './urlConfig'

export const uploadImagesThumbsApi = {
  uploadImagesThumbs(data?: FormData) {
    return axiosClient.post(UPLOAD_IMAGES_THUMBS_API, data)
  },
}
