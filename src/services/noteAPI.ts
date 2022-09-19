import { BaseDataResponse, MetaPagination, NewNote, Note } from 'src/types';
import axiosInstance from './axiosInstance';

const noteAPI = {
  getNotes(): Promise<BaseDataResponse<Note[], MetaPagination>> {
    const url = '/notes';
    return axiosInstance.get(url);
  },
  getNoteDetail(id: string): Promise<BaseDataResponse<Note>> {
    const url = `/notes/${id}`;
    return axiosInstance.get(url);
  },
  createNote(data: NewNote): Promise<BaseDataResponse<Note>> {
    const url = '/notes';
    return axiosInstance.post(url, data);
  },
};
export default noteAPI;
