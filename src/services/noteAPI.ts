import { BaseDataResponse, MetaPagination, Note } from 'src/types';
import axiosInstance from './axiosInstance';

const noteAPI = {
  getNotes(): Promise<BaseDataResponse<Note[], MetaPagination>> {
    const url = '/notes';
    return axiosInstance.get(url);
  },
};
export default noteAPI;
