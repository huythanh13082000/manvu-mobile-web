import { Topic } from "../types/topic.type"
import axiosClient from "./axiosClient"
import { MEMBER_TOPIC_API } from "./urlConfig"

export const topicApi = {
  getListTopic():Promise<Topic>{
    return axiosClient.get(MEMBER_TOPIC_API)
  }
}