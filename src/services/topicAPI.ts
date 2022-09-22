import { BaseDataResponse, MetaPagination } from 'src/types';
import { Topic } from 'src/types/Topic';
import axiosInstance from './axiosInstance';

const topicAPI = {
  getTopics(): Promise<BaseDataResponse<Topic[], MetaPagination>> {
    const url = '/topics';
    return axiosInstance.get(url);
  },
};
export default topicAPI;
