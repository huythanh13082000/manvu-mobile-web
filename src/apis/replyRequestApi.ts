import axiosClient from './axiosClient'
import {ADVERTISER_CAMPAIGN_REPLY_REQUEST_API} from './urlConfig'

export const replyRequestApi = {
  replyRequest(params: {id: number; status: number}) {
    return axiosClient.post(
      `${ADVERTISER_CAMPAIGN_REPLY_REQUEST_API}/${params.id}`,
      {status: params.status}
    )
  },
}
