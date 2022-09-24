import { BaseDataResponse, MetaPagination } from 'src/types';
import { GetTopicsPayload, Topic } from 'src/types/Topic';
import axiosInstance from './axiosInstance';

const topicAPI = {
  getTopics(payload?: GetTopicsPayload): Promise<BaseDataResponse<Topic[], MetaPagination>> {
    const url = '/topics';
    return axiosInstance.get(url, { params: payload?.params });
  },
};
export default topicAPI;
