import { BaseDataResponse, MetaPagination } from 'src/types';
import { GetTopicsPayload, NewTopic, Topic, TopicUpdateRequest } from 'src/types/Topic';
import axiosInstance from './axiosInstance';

const topicAPI = {
  getTopics(payload?: GetTopicsPayload): Promise<BaseDataResponse<Topic[], MetaPagination>> {
    const url = '/topics';
    return axiosInstance.get(url, { params: payload?.params });
  },
  getTopicDetail(id: string): Promise<BaseDataResponse<Topic>> {
    const url = `/topics/${id}`;
    return axiosInstance.get(url);
  },
  createTopic(data: NewTopic): Promise<BaseDataResponse<Topic>> {
    const url = '/topics';
    return axiosInstance.post(url, data);
  },
  updateTopic(payload: TopicUpdateRequest): Promise<BaseDataResponse<Topic>> {
    const { id, data } = payload;
    const url = `/topics/${id}`;
    return axiosInstance.put(url, data);
  },
  deleteTopic(id: string): Promise<BaseDataResponse<Topic>> {
    const url = `/topics/${id}`;
    return axiosInstance.delete(url);
  },
};
export default topicAPI;
