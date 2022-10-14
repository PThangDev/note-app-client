import {
  BaseDataResponse,
  GetNotePayload,
  MetaPagination,
  NewNote,
  Note,
  NoteUpdate,
  ToggleManyNotesToTrash,
  ToggleNoteToPin,
  ToggleNoteToTrash,
} from 'src/types';
import axiosInstance from './axiosInstance';

const noteAPI = {
  getNotes(payload?: GetNotePayload): Promise<BaseDataResponse<Note[], MetaPagination>> {
    let url: string = `/notes`;

    if (payload?.endpoint) {
      url = `${url}${payload.endpoint}`;
    }

    return axiosInstance.get(url, { params: payload?.params });
  },
  getNotesInTrash(): Promise<BaseDataResponse<Note[], MetaPagination>> {
    const url = '/notes/trashs';
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
  updateNote(data: NoteUpdate): Promise<BaseDataResponse<Note>> {
    const url = `/notes/${data.id}`;
    return axiosInstance.put(url, data);
  },
  toggleNoteToTrash(payload: ToggleNoteToTrash): Promise<BaseDataResponse<Note>> {
    const { id, is_trash } = payload;
    const url = `/notes/${id}`;
    return axiosInstance.put(url, { is_trash });
  },
  toggleManyNotesToTrash(payload: ToggleManyNotesToTrash): Promise<BaseDataResponse> {
    const { noteIds, is_trash } = payload;
    const url = is_trash ? '/notes/move-to-trash' : '/restore-from-trash';
    return axiosInstance.put(url, { noteIds });
  },
  toggleNoteToPin(payload: ToggleNoteToPin): Promise<BaseDataResponse<Note>> {
    const { id, is_pin } = payload;
    const url = `/notes/${id}`;
    return axiosInstance.put(url, { is_pin });
  },
  deleteNote(id: string): Promise<BaseDataResponse<Note>> {
    const url = `/notes/${id}`;
    return axiosInstance.delete(url);
  },
};
export default noteAPI;
