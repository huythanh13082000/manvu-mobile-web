import { InappNotification } from '../types/InappNotification.type';
import axiosClient from './axiosClient'
import {INAPP_NOTIFICATION_API} from './urlConfig'

export const inappNotificationApi = {
  getInappNotification(params: {limit?: number; offset?: number}) {
    return axiosClient.get(INAPP_NOTIFICATION_API, {params})
  },
  deleteInappNotification(id: number) {
    return axiosClient.delete(`${INAPP_NOTIFICATION_API}/${id}`)
  },
  createInappNotification(parmas: InappNotification) {
    return axiosClient.post(INAPP_NOTIFICATION_API, parmas)
  },
  updateInappNotification(params: {id: number; status: number}) {
    return axiosClient.put(`${INAPP_NOTIFICATION_API}/${params.id}`, {
      status: params.status,
    })
  },
  getInappNotificationCountUnread() {
    return axiosClient.get(`${INAPP_NOTIFICATION_API}/count-unread`)
  },
}
